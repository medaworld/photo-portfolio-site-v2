import { styled } from 'styled-components';
import { firestore, storage } from '../../../lib/firebase';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import ResponsiveImage from '../../common/ResponsiveImage';
import { MdEdit, MdDelete, MdPhotoAlbum } from 'react-icons/md';
import { deleteObject, ref } from 'firebase/storage';
import { NotificationContext } from '../../../context/notification/NotificationContext';
import CustomModal from '../../common/CustomModal';
import EditPhotos from './EditPhotosForm';
import { size } from '../../../utils/breakpoints';
import AddToAlbum from './AddToAlbum';

export const AdminPhotoLibraryContainer = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.backgroundSecondary};
  padding-bottom: 0;
  height: calc(100vh - 110px);
  overflow: scroll;

  @media (max-width: ${size.mobileL}) {
    height: calc(100vh - 170px);
  }
`;

export const ImageGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const ImageWrapper = styled.div<{ isSelected }>`
  width: 150px;
  padding: 5px;
  transition: opacity 0.3s ease;
  cursor: pointer;

  img {
    outline: ${({ isSelected }) => (isSelected ? '3px solid #ff0000' : 'none')};
  }
  &:hover {
    opacity: 0.8;
  }
`;

export const BottomPanel = styled.div`
  position: sticky;
  bottom: 0;
  background-color: ${(props) => props.theme.tplight};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TopActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const BottomActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

export const ButtonWithIcon = styled.button<{ danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => (props.danger ? '#ff0000' : 'inherit')};
`;

export const ImagePreview = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 5px;
  margin-right: 8px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function AdminPhotoLibrary() {
  const notificationCtx = useContext(NotificationContext);
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [addToAlbumIsOpen, setAddToAlbumIsOpen] = useState(false);

  async function fetchImages() {
    try {
      const imagesQuery = query(
        collection(firestore, 'images'),
        orderBy('uploadedAt', 'desc')
      );
      const snapshot = await getDocs(imagesQuery);

      const images = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return images;
    } catch (error) {
      console.error('Error fetching images:', error);
      return [];
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const newImages = await fetchImages();
      setImages(newImages);
    };

    fetchData();
  }, []);

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
        const image = images.find((img) => img.id === imageId);

        if (image) {
          const docRef = doc(firestore, 'images', imageId);
          await deleteDoc(docRef);

          const imageRef = ref(storage, `images/${imageId}`);
          await deleteObject(imageRef);
        }
      });

      await Promise.all(deletePromises);

      const updatedImages = images.filter(
        (img) => !selectedImages.includes(img.id)
      );

      notificationCtx.showNotification({
        title: 'Success',
        message: 'Images deleted successfully',
        status: 'success',
      });

      setImages(updatedImages);
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
    const newImages = await fetchImages();
    setImages(newImages);
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
      const date = new Date(image.uploadedAt.toDate());
      let key = date.toDateString();

      if (images.length > 20) {
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

  const groupedImages = groupImagesByDateOrMonth(images);

  function renderImagesGroup(groupedImages) {
    return Object.keys(groupedImages).map((date) => (
      <div key={date}>
        <h2>
          {date} -{' '}
          <button
            type="button"
            onClick={() => selectAllFromGroup(groupedImages[date])}
          >
            Select All
          </button>
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
    <AdminPhotoLibraryContainer>
      <h1>Photo Library</h1>
      <p>Date uploaded</p>
      {renderImagesGroup(groupedImages)}
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
                {images
                  .filter((img) => selectedImages.includes(img.id))
                  .slice(0, 5)
                  .map((img) => (
                    <ImagePreview key={img.id}>
                      <picture>
                        <img src={img.url} alt={img.description} />
                      </picture>
                    </ImagePreview>
                  ))}
                {selectedImages.length > 5 && (
                  <span>+{selectedImages.length - 5} more</span>
                )}
              </div>
            </div>
            <button type="button" onClick={handleClearSelectedImages}>
              Clear Selection
            </button>
          </TopActions>

          <BottomActions>
            <ButtonWithIcon type="button" onClick={editSelectedImages}>
              <MdEdit />
              Edit
            </ButtonWithIcon>

            <ButtonWithIcon type="button" onClick={addToAlbum}>
              <MdPhotoAlbum />
              Add to Album
            </ButtonWithIcon>

            <ButtonWithIcon type="button" onClick={deleteSelectedImages} danger>
              <MdDelete />
              Delete
            </ButtonWithIcon>
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
    </AdminPhotoLibraryContainer>
  );
}
