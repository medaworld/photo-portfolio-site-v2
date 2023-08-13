import { firestore, storage } from '../../../lib/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { useContext, useEffect, useRef, useState } from 'react';
import ResponsiveImage from '../../common/ResponsiveImage';
import { MdEdit, MdDelete, MdPhotoAlbum } from 'react-icons/md';
import { deleteObject, ref } from 'firebase/storage';
import { NotificationContext } from '../../../context/notification/NotificationContext';
import CustomModal from '../../common/CustomModal';
import EditPhotos from './EditPhotosForm';
import AddToAlbum from './AddToAlbum';
import {
  AdminImageLibraryContainer,
  AdminImageLibraryInner,
  BottomActions,
  BottomPanel,
  ImageGroup,
  ImagePreview,
  ImageWrapper,
  TopActions,
} from './AdminImageLibraryStyles';
import { fetchImages } from '../../../utils/firebaseUtils';
import StyledButton from '../../common/StyledButton';

export default function AdminPhotoLibrary({ imagesData }) {
  const notificationCtx = useContext(NotificationContext);
  const [allPhotos, setAllPhotos] = useState(imagesData.images);
  const [lastVisible, setLastVisible] = useState(imagesData.lastVisible);
  const [selectedImages, setSelectedImages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [addToAlbumIsOpen, setAddToAlbumIsOpen] = useState(false);

  const loadMoreRef = useRef(null);

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

  function toggleSelectImage(imageId) {
    if (selectedImages.includes(imageId)) {
      setSelectedImages((prev) => prev.filter((id) => id !== imageId));
    } else {
      setSelectedImages((prev) => [...prev, imageId]);
    }
  }

  function selectAllFromGroup(group) {
    const newSelectedImages = group.map((image) => image.id);
    setSelectedImages((prev) => [...new Set([...prev, ...newSelectedImages])]);
  }

  function editSelectedImages() {
    setAddToAlbumIsOpen(false);
    setModalIsOpen(true);
    setEditIsOpen(true);
  }

  function addToAlbum() {
    setEditIsOpen(false);
    setModalIsOpen(true);
    setAddToAlbumIsOpen(true);
  }

  async function deleteSelectedImages() {
    notificationCtx.showNotification({
      title: 'Deleting...',
      message: 'Please wait. Deleting',
      status: 'Pending',
    });

    try {
      const deletePromises = selectedImages.map(async (imageId) => {
        const image = allPhotos.find((img) => img.id === imageId);

        if (image) {
          const docRef = doc(firestore, 'images', imageId);
          await deleteDoc(docRef);

          const imageRef = ref(storage, `images/${imageId}`);
          await deleteObject(imageRef);
        }
      });

      await Promise.all(deletePromises);

      const updatedImages = allPhotos.filter(
        (img) => !selectedImages.includes(img.id)
      );

      notificationCtx.showNotification({
        title: 'Success',
        message: 'Images deleted successfully',
        status: 'success',
      });

      setAllPhotos(updatedImages);
      setSelectedImages([]);
    } catch (error) {
      console.error('Error deleting images:', error);
      notificationCtx.showNotification({
        title: 'Error',
        message:
          'An error occurred while deleting the images. Please try again.',
        status: 'error',
      });
    }
  }

  const closeModal = () => {
    setModalIsOpen(false);
    setAddToAlbumIsOpen(false);
    setEditIsOpen(false);
  };

  const handleClearSelectedImages = () => {
    setSelectedImages([]);
  };

  const handleRefreshImages = async () => {
    const newImages = await fetchImages({});
    setAllPhotos(newImages);
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  function groupImagesByDateOrMonth(images) {
    return images.reduce((acc, image) => {
      const date = new Date(image.uploadedAt);
      let key = date.toDateString();

      if (images.length > 50) {
        const monthName = months[date.getMonth()];
        key = `${monthName} ${date.getFullYear()}`;
      }

      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(image);
      return acc;
    }, {});
  }

  const groupedImages = groupImagesByDateOrMonth(allPhotos);

  function renderImagesGroup(groupedImages) {
    return Object.keys(groupedImages).map((date) => (
      <div key={date}>
        <h2>
          {date} -{' '}
          <StyledButton
            variant="neutral"
            type="button"
            onClick={() => selectAllFromGroup(groupedImages[date])}
          >
            Select All
          </StyledButton>
        </h2>
        <ImageGroup>
          {groupedImages[date].map((image) => (
            <ImageWrapper
              key={image.id}
              onClick={() => toggleSelectImage(image.id)}
              isSelected={selectedImages.includes(image.id)}
            >
              <ResponsiveImage src={image.url} alt={image.description} />
            </ImageWrapper>
          ))}
        </ImageGroup>
      </div>
    ));
  }

  return (
    <AdminImageLibraryContainer>
      <AdminImageLibraryInner>
        <h1>Image Library</h1>
        <p>Date uploaded</p>
        {renderImagesGroup(groupedImages)}
        <div ref={loadMoreRef} />
      </AdminImageLibraryInner>
      {selectedImages.length > 0 && (
        <BottomPanel>
          <TopActions>
            <div>
              <span>{selectedImages.length} selected</span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '0.5rem',
                }}
              >
                {allPhotos
                  .filter((img) => selectedImages.includes(img.id))
                  .slice(0, 4)
                  .map((img) => (
                    <ImagePreview key={img.id}>
                      <picture>
                        <img src={img.url} alt={img.description} />
                      </picture>
                    </ImagePreview>
                  ))}
                {selectedImages.length > 4 && (
                  <span>+{selectedImages.length - 4} more</span>
                )}
              </div>
            </div>
            <StyledButton
              variant="neutral"
              type="button"
              onClick={handleClearSelectedImages}
            >
              Clear Selection
            </StyledButton>
          </TopActions>

          <BottomActions>
            <StyledButton
              variant="neutral"
              type="button"
              onClick={editSelectedImages}
            >
              <MdEdit />
              Edit
            </StyledButton>

            <StyledButton variant="neutral" type="button" onClick={addToAlbum}>
              <MdPhotoAlbum />
              Add to Album
            </StyledButton>

            <StyledButton
              variant="error"
              type="button"
              onClick={deleteSelectedImages}
            >
              <MdDelete />
              Delete
            </StyledButton>
          </BottomActions>
        </BottomPanel>
      )}
      <CustomModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
        {editIsOpen && (
          <EditPhotos
            selectedImages={selectedImages}
            clearSelectedImages={handleClearSelectedImages}
            refreshImages={handleRefreshImages}
            closeModal={closeModal}
          />
        )}
        {addToAlbumIsOpen && (
          <AddToAlbum selectedImages={selectedImages} closeModal={closeModal} />
        )}
      </CustomModal>
    </AdminImageLibraryContainer>
  );
}
