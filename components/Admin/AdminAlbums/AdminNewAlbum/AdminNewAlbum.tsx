import { MdArrowBack } from 'react-icons/md';
import { useContext, useEffect, useRef, useState } from 'react';
import DateInput from '../../../common/DateInput';
import { addAlbum, fetchImages } from '../../../../utils/firebaseUtils';
import PhotoCard from '../../../common/PhotoCard';
import Image from 'next/image';
import StyledButton from '../../../common/StyledButton';
import {
  AdminNewAlbumContainer,
  BackLink,
  NewAlbumForm,
  FormInputs,
  CoverImageContainer,
  CoverText,
  PhotosDisplay,
  InfinitePhotos,
  Photo,
} from './AdminNewAlbumStyles';
import StyledInput from '../../../common/StyledInput';
import StyledTextArea from '../../../common/StyledTextArea';
import { NotificationContext } from '../../../../context/notification/NotificationContext';
import { useRouter } from 'next/router';

export default function AdminNewAlbum({ images }) {
  const [albumPhotos, setAlbumPhotos] = useState([]);
  const [allPhotos, setAllPhotos] = useState(images.images);
  const [cover, setCover] = useState(null);
  const [lastVisible, setLastVisible] = useState(images.lastVisible);
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredDescription, setEnteredDescription] = useState('');
  const [enteredDate, setEnteredDate] = useState<Date>();
  const loadMoreRef = useRef(null);
  const notificationCtx = useContext(NotificationContext);
  const router = useRouter();

  const addToAlbum = (photo) => {
    if (!albumPhotos.includes(photo)) {
      setAlbumPhotos([...albumPhotos, photo]);
    }
  };

  useEffect(() => {
    const fetchMoreImages = async () => {
      if (lastVisible) {
        const newImages = await fetchImages({ lastVisible: lastVisible });
        setAllPhotos((prevPhotos) => [
          ...prevPhotos,
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
  }, [lastVisible]);

  function handleDeletePhoto(id) {
    if (cover?.id === id) {
      setCover(null);
    }
    setAlbumPhotos((prev) => prev.filter((photo) => photo.id !== id));
  }

  function handleSetCover(photo) {
    setCover(photo);
  }

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

  async function submitHandler(event) {
    event.preventDefault();
    if (!enteredTitle || !albumPhotos || !cover) {
      alert('Please enter all input fields');
      return;
    }
    notificationCtx.showNotification({
      title: 'Uploading...',
      message: 'Please wait. Adding album',
      status: 'Pending',
    });

    try {
      const photos = albumPhotos.map((photo) => {
        return photo.id;
      });

      const albumData = {
        title: enteredTitle,
        description: enteredDescription,
        photos: photos,
        cover: cover.id,
        dateTaken: enteredDate,
      };

      await addAlbum(albumData);
      notificationCtx.showNotification({
        title: 'Success',
        message: 'Album added successfully',
        status: 'success',
      });
      router.push('/secure/admin/albums');
    } catch (error) {
      console.error('Error adding album: ', error);
      notificationCtx.showNotification({
        title: 'Error',
        message: 'An error occurred while adding album. Please try again.',
        status: 'error',
      });
    }
  }

  return (
    <AdminNewAlbumContainer>
      <BackLink href={'/secure/admin/albums'}>
        <MdArrowBack />
        <span>Back to albums</span>
      </BackLink>

      <NewAlbumForm>
        <FormInputs>
          <label>Title</label>
          <StyledInput
            variant="primary"
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleInputChange}
          />
          <label>Description</label>
          <StyledTextArea
            variant="primary"
            placeholder="Description"
            name="description"
            onChange={handleInputChange}
          />
          <label>Date</label>
          <DateInput setSelectedDate={setEnteredDate} />
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
                src={cover.url}
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

        <h4>Photos in Album:</h4>
        <PhotosDisplay>
          {albumPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              handleSetCover={handleSetCover}
              handleDeletePhoto={handleDeletePhoto}
              cover={cover}
            />
          ))}
        </PhotosDisplay>

        <h4>All Photos:</h4>
        <InfinitePhotos>
          {allPhotos.map((photo) => (
            <Photo
              key={photo.id}
              style={{ backgroundImage: `url(${photo.url})` }}
              onClick={() => addToAlbum(photo)}
            />
          ))}
          <div ref={loadMoreRef} />
        </InfinitePhotos>
        <StyledButton variant={'primary'} onClick={submitHandler}>
          Add Album
        </StyledButton>
      </NewAlbumForm>
    </AdminNewAlbumContainer>
  );
}
