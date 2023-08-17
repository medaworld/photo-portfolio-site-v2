import { useState, useContext, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import BackLink from '../../../common/BackLink';
import StyledInput from '../../../common/StyledInput';
import StyledTextArea from '../../../common/StyledTextArea';
import StyledButton from '../../../common/StyledButton';
import DragDropRow from '../../../common/DragDropRow';
import InfiniteImagesBox from '../../../common/InfiniteItemsBox';

import {
  addAlbum,
  addCollection,
  fetchImages,
} from '../../../../utils/firebaseUtils';
import { NotificationContext } from '../../../../context/notification/NotificationContext';

import {
  AdminNewAlbumContainer,
  CoverImageContainer,
  CoverText,
  FormInputs,
  NewCollectionForm,
} from './AdminNewCollectionStyles';
import { capitalizeFirstLetter } from '../../../../utils/stringUtils';
import DateInput from '../../../common/DateInput';

export default function AdminNewCollection({ items, type }) {
  const pluralType = type + 's';
  const itemType = type === 'collection' ? 'Albums' : 'Images';
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredDescription, setEnteredDescription] = useState('');
  const [enteredDate, setEnteredDate] = useState<Date>();
  const [allItems, setAllItems] = useState(items.images || items);
  const [lastVisible, setLastVisible] = useState(items.lastVisible || null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [cover, setCover] = useState(null);
  const notificationCtx = useContext(NotificationContext);
  const router = useRouter();
  const loadMoreRef = useRef(null);

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

  const addToCollection = (item) => {
    if (!selectedItems.some((existingItem) => existingItem.id === item.id)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  function removeFromCollection(id) {
    if (cover?.id === id) {
      setCover(null);
    }
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  }

  function handleSetCover(photo) {
    setCover(photo);
  }

  async function submitHandler(event: any) {
    event.preventDefault();
    if (!enteredTitle || !selectedItems) {
      alert('Please enter all input fields');
      return;
    }
    notificationCtx.showNotification({
      title: 'Uploading...',
      message: `Please wait. Adding ${type}`,
      status: 'Pending',
    });

    try {
      const selectedItemsIds = selectedItems.map((item) => {
        return item.id;
      });

      let collectionData: any;
      if (type === 'collection') {
        collectionData = {
          title: enteredTitle,
          description: enteredDescription,
          cover: cover.id,
          albums: selectedItemsIds,
        };
        await addCollection(collectionData);
      } else {
        collectionData = {
          title: enteredTitle,
          description: enteredDescription,
          dateTaken: enteredDate,
          cover: cover.id,
          photos: selectedItemsIds,
        };
        await addAlbum(collectionData);
      }
      notificationCtx.showNotification({
        title: 'Success',
        message: `${capitalizeFirstLetter(type)} added successfully`,
        status: 'success',
      });
      router.push(`/secure/admin/${pluralType}`);
    } catch (error) {
      console.error(`Error adding ${type}: `, error);
      notificationCtx.showNotification({
        title: 'Error',
        message: `An error occurred while adding ${type}. Please try again.`,
        status: 'error',
      });
    }
  }

  useEffect(() => {
    if (type === 'album') {
      const fetchMoreImages = async () => {
        if (lastVisible) {
          const newImages = await fetchImages({ lastVisible: lastVisible });
          setAllItems((prevImages) => [
            ...prevImages,
            ...(newImages.images || []),
          ]);
          setLastVisible(newImages.lastVisible);
        }
      };
      const currentRef = loadMoreRef.current;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchMoreImages();
          }
        },
        { threshold: 1 }
      );

      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }
  }, [lastVisible, type]);

  return (
    <AdminNewAlbumContainer>
      <BackLink
        href={`/secure/admin/${pluralType}`}
        text={`Back to ${pluralType}`}
      />

      <NewCollectionForm>
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
          {type === 'album' && (
            <>
              <label htmlFor="date">Date Taken</label>
              <DateInput setSelectedDate={setEnteredDate} />
            </>
          )}
        </FormInputs>

        <CoverImageContainer>
          <CoverText>
            {enteredTitle && <div className="title">{enteredTitle}</div>}
            {enteredDescription && (
              <div className="description">{enteredDescription}</div>
            )}
            {enteredDate && (
              <div className="date">{enteredDate.toLocaleDateString()}</div>
            )}
          </CoverText>
          {cover ? (
            <>
              <Image
                src={cover.cover || cover.url}
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

        <h4>{`${itemType} in ${type}`}:</h4>
        <DragDropRow
          items={selectedItems}
          setItems={setSelectedItems}
          onSetCover={handleSetCover}
          onRemove={removeFromCollection}
          cover={cover}
        />

        <h4>{`All ${itemType}:`}</h4>
        <InfiniteImagesBox
          allItems={allItems}
          onAdd={addToCollection}
          loadMoreRef={loadMoreRef}
        />

        <StyledButton
          variant={'primary'}
          onClick={submitHandler}
          style={{ padding: '10px 20px' }}
        >
          Save {capitalizeFirstLetter(type)}
        </StyledButton>
      </NewCollectionForm>
    </AdminNewAlbumContainer>
  );
}
