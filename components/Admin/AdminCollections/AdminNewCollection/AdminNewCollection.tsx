import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import BackLink from '../../../common/BackLink';
import StyledInput from '../../../common/StyledInput';
import StyledTextArea from '../../../common/StyledTextArea';
import StyledButton from '../../../common/StyledButton';
import DragDropRow from '../../../common/DragDropRow';
import InfiniteImagesBox from '../../../common/InfiniteItemsBox';

import { addCollection } from '../../../../utils/firebaseUtils';
import { NotificationContext } from '../../../../context/notification/NotificationContext';

import {
  AdminNewAlbumContainer,
  CoverImageContainer,
  CoverText,
  FormInputs,
  NewCollectionForm,
} from './AdminNewCollectionStyles';

export default function AdminNewCollection({ albums }) {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredDescription, setEnteredDescription] = useState('');
  const [selectedAlbums, setSelectedAlbums] = useState([]);
  const [cover, setCover] = useState(null);
  const notificationCtx = useContext(NotificationContext);
  const router = useRouter();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    switch (name) {
      case 'title':
        setEnteredTitle(value);
        break;
      case 'description':
        setEnteredDescription(value);
        break;
      default:
        break;
    }
  };

  const addToCollection = (album) => {
    if (!selectedAlbums.includes(album)) {
      setSelectedAlbums([...selectedAlbums, album]);
    }
  };

  function removeFromCollection(id) {
    if (cover?.id === id) {
      setCover(null);
    }
    setSelectedAlbums((prev) => prev.filter((photo) => photo.id !== id));
  }

  function handleSetCover(photo) {
    setCover(photo);
  }

  async function submitHandler(event: any) {
    event.preventDefault();
    if (!enteredTitle || !selectedAlbums) {
      alert('Please enter all input fields');
      return;
    }
    notificationCtx.showNotification({
      title: 'Uploading...',
      message: 'Please wait. Adding collection',
      status: 'Pending',
    });

    try {
      const albums = selectedAlbums.map((album) => {
        return album.id;
      });

      const collectionData = {
        title: enteredTitle,
        description: enteredDescription,
        cover: cover.id,
        albums: albums,
      };

      await addCollection(collectionData);
      notificationCtx.showNotification({
        title: 'Success',
        message: 'Collection added successfully',
        status: 'success',
      });
      router.push('/secure/admin/collections');
    } catch (error) {
      console.error('Error adding collection: ', error);
      notificationCtx.showNotification({
        title: 'Error',
        message: 'An error occurred while adding collection. Please try again.',
        status: 'error',
      });
    }
  }

  return (
    <AdminNewAlbumContainer>
      <BackLink
        href={'/secure/admin/collections'}
        text={'Back to collections'}
      />
      <NewCollectionForm onSubmit={submitHandler}>
        <FormInputs>
          <label htmlFor="title">Title</label>
          <StyledInput
            name="title"
            variant="primary"
            type="text"
            placeholder="Title"
            onChange={handleInputChange}
          />
          <label htmlFor="description">Description</label>
          <StyledTextArea
            variant="primary"
            placeholder="Description"
            name="description"
            onChange={handleInputChange}
          />
        </FormInputs>

        <CoverImageContainer>
          <CoverText>
            {enteredTitle && <div className="title">{enteredTitle}</div>}
            {enteredDescription && (
              <div className="description">{enteredDescription}</div>
            )}
          </CoverText>
          {cover ? (
            <>
              <Image
                src={cover.cover}
                alt={cover.title || 'Image'}
                className={'image'}
                width={400}
                height={400}
              />
            </>
          ) : (
            <span>Select a cover</span>
          )}
        </CoverImageContainer>

        <h4>Albums in Collection:</h4>
        <DragDropRow
          items={selectedAlbums}
          setItems={setSelectedAlbums}
          onSetCover={handleSetCover}
          onRemove={removeFromCollection}
          cover={cover}
        />

        <h4>All Albums:</h4>
        <InfiniteImagesBox
          allItems={albums}
          onAdd={addToCollection}
          loadMoreRef={undefined}
        />

        <StyledButton variant={'primary'} onClick={submitHandler}>
          Save Collection
        </StyledButton>
      </NewCollectionForm>
    </AdminNewAlbumContainer>
  );
}
