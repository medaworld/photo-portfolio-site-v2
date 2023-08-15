import { useContext, useEffect, useRef, useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import Image from 'next/image';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  AdminAlbumsLibraryContainer,
  AlbumCard,
  EditableText,
  PhotoCardContainer,
  PhotosGrid,
  BackLink,
  CoverImageContainer,
  CoverText,
} from './AdminEditAlbumStyles';
import StyledButton from '../../../common/StyledButton';
import {
  deleteAlbum,
  fetchImages,
  updateAlbum,
} from '../../../../utils/firebaseUtils';
import { NotificationContext } from '../../../../context/notification/NotificationContext';
import { useRouter } from 'next/router';
import DateInput from '../../../common/DateInput';
import PhotoCard from '../../../common/PhotoCard';
import InfiniteImagesBox from '../../../common/InfiniteImagesBox';

export default function AdminEditAlbum({ albumData }) {
  const [album, setAlbum] = useState(albumData);
  const [photos, setPhotos] = useState(albumData.photos || []);
  const [allImages, setAllImages] = useState([]);
  const [lastVisible, setLastVisible] = useState([]);
  const [cover, setCover] = useState(albumData.cover);
  const [isEditing, setIsEditing] = useState(false);
  const [enteredTitle, setEnteredTitle] = useState(albumData.title || '');
  const [enteredDescription, setEnteredDescription] = useState(
    albumData.description || ''
  );
  const [enteredDate, setEnteredDate] = useState(albumData.date || '');
  const [showAllImages, setShowAllImages] = useState(false);
  const notificationCtx = useContext(NotificationContext);
  const router = useRouter();
  const loadMoreRef = useRef(null);

  const handleEditToogle = (field) => {
    setIsEditing((prev) => !prev);
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  function handleDeletePhoto(id) {
    if (cover?.id === id) {
      setCover(null);
    }
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  }

  function handleSetCover(photo) {
    setCover(photo);
  }

  async function submitHandler(e) {
    e.preventDefault();
    notificationCtx.showNotification({
      title: 'Saving...',
      message: 'Please wait. Saving changes',
      status: 'Pending',
    });
    try {
      const photoData = photos.map((photo) => {
        return photo.id;
      });
      const albumData = {
        title: enteredTitle,
        description: enteredDescription,
        dateTaken: enteredDate,
        cover: cover.id,
        photos: photoData,
        id: album.id,
      };
      console.log(albumData);
      await updateAlbum(albumData);
      notificationCtx.showNotification({
        title: 'Success',
        message: 'Album updated successfully',
        status: 'success',
      });
      router.push('/secure/admin/albums');
    } catch (error) {
      console.error('Error saving: ', error);
      notificationCtx.showNotification({
        title: 'Error',
        message: 'An error occurred while saving changes. Please try again.',
        status: 'error',
      });
    }
  }

  const handleAddMoreImages = async () => {
    const images = await fetchImages({});
    setAllImages(images.images);
    setLastVisible(images.lastVisible);
    setShowAllImages(true);
  };

  useEffect(() => {
    const fetchMoreImages = async () => {
      if (lastVisible) {
        const newImages = await fetchImages({ lastVisible: lastVisible });
        setAllImages((prevPhotos) => [
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

  const addToAlbum = (photo) => {
    if (!photos.includes(photo)) {
      setPhotos([...photos, photo]);
    }
  };

  const handleDeleteAlbum = async (event) => {
    event.preventDefault();
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this album?'
    );

    if (isConfirmed) {
      notificationCtx.showNotification({
        title: 'Deleting...',
        message: 'Please wait. Deleting album',
        status: 'Pending',
      });
      try {
        await deleteAlbum(album.id);
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
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedPhotos = Array.from(photos);
    const [removed] = reorderedPhotos.splice(result.source.index, 1);
    reorderedPhotos.splice(result.destination.index, 0, removed);

    setPhotos(reorderedPhotos);
  };

  return (
    <AdminAlbumsLibraryContainer>
      <BackLink href={'/secure/admin/albums'}>
        <MdArrowBack />
        <span>Back to albums</span>
      </BackLink>

      <AlbumCard>
        <StyledButton
          variant="primary"
          style={{
            position: 'absolute',
            zIndex: '2',
            top: '10px',
            right: '10px',
          }}
          onClick={submitHandler}
        >
          Save Change
        </StyledButton>
        <CoverImageContainer>
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
            <span> </span>
          )}
        </CoverImageContainer>

        <CoverText>
          <EditableText className="title">
            {isEditing ? (
              <input
                type="text"
                value={enteredTitle}
                name="title"
                onChange={handleInputChange}
              />
            ) : (
              <span onClick={handleEditToogle}>{album.title}</span>
            )}
          </EditableText>

          <EditableText className="description">
            {isEditing ? (
              <input
                type="text"
                value={enteredDescription}
                name="description"
                onChange={handleInputChange}
              />
            ) : (
              <span onClick={handleEditToogle}>
                {enteredDescription
                  ? enteredDescription
                  : 'Click here to enter description'}
              </span>
            )}
          </EditableText>

          <EditableText className="date">
            {isEditing ? (
              <DateInput setSelectedDate={setEnteredDate} />
            ) : (
              <span onClick={handleEditToogle}>
                {enteredDate
                  ? enteredDate.toLocaleDateString()
                  : 'Click to enter date'}
              </span>
            )}
          </EditableText>

          {isEditing && (
            <StyledButton
              variant="neutral"
              style={{ position: 'absolute', bottom: '5px' }}
              onClick={handleSaveChanges}
            >
              Done
            </StyledButton>
          )}
        </CoverText>
      </AlbumCard>

      <h4>Photos in Album:</h4>
      {photos.length > 0 ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="photosGrid" direction="horizontal">
            {(provided) => (
              <PhotosGrid ref={provided.innerRef} {...provided.droppableProps}>
                {photos.map((photo, index) => (
                  <Draggable
                    key={photo.id}
                    draggableId={photo.id}
                    index={index}
                  >
                    {(provided) => (
                      <PhotoCardContainer
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <PhotoCard
                          photo={photo}
                          handleSetCover={handleSetCover}
                          handleDeletePhoto={handleDeletePhoto}
                          cover={cover}
                        />
                      </PhotoCardContainer>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </PhotosGrid>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <p>No photos added to this album yet. Add some to get started!</p>
      )}

      {showAllImages ? (
        <>
          <h4>All Images:</h4>
          <InfiniteImagesBox
            allImages={allImages}
            addToAlbum={addToAlbum}
            loadMoreRef={loadMoreRef}
          />
        </>
      ) : (
        <StyledButton
          variant="neutral"
          onClick={handleAddMoreImages}
          style={{ margin: '1rem 0' }}
        >
          Add more images
        </StyledButton>
      )}

      <StyledButton
        variant="error"
        onClick={handleDeleteAlbum}
        style={{ display: 'block' }}
      >
        Delete album
      </StyledButton>
    </AdminAlbumsLibraryContainer>
  );
}
