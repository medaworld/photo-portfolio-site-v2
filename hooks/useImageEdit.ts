import { useState, useEffect, useContext, useRef } from 'react';
import { deleteImages, fetchImages } from '../utils/firebaseUtils';
import { months } from '../utils/dateUtils';
import { NotificationContext } from '../context/notification/NotificationContext';
import { firestore, storage } from '../lib/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

export function useImageEdit(imagesData) {
  const notificationCtx = useContext(NotificationContext);
  const [allPhotos, setAllPhotos] = useState(imagesData.images);
  const [lastVisible, setLastVisible] = useState(imagesData.lastVisible);
  const [selectedImages, setSelectedImages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [addToAlbumIsOpen, setAddToAlbumIsOpen] = useState(false);

  const loadMoreRef = useRef(null);

  // Infinite scroll load
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
      await deleteImages(selectedImages);
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

  return {
    allPhotos,
    selectedImages,
    modalIsOpen,
    editIsOpen,
    addToAlbumIsOpen,
    loadMoreRef,
    toggleSelectImage,
    selectAllFromGroup,
    editSelectedImages,
    addToAlbum,
    deleteSelectedImages,
    closeModal,
    handleClearSelectedImages,
    handleRefreshImages,
    groupedImages,
  };
}
