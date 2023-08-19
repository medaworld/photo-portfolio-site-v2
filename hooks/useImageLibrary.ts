import { useState, useEffect, useContext, useRef } from 'react';
import { deleteImages, fetchImages } from '../utils/firebaseUtils';
import { months } from '../utils/dateUtils';
import { NotificationContext } from '../context/notification/NotificationContext';

export function useImageLibrary(images) {
  const notificationCtx = useContext(NotificationContext);
  const [allImages, setAllImages] = useState(images.images);
  const [lastVisible, setLastVisible] = useState(images.lastVisible);
  const [selectedImages, setSelectedImages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [addToAlbumIsOpen, setAddToAlbumIsOpen] = useState(false);

  const loadMoreRef = useRef(null);

  // INFINITE SCROLL
  useEffect(() => {
    const fetchMoreImages = async () => {
      if (lastVisible) {
        const newImages = await fetchImages({ lastVisible: lastVisible });
        setAllImages((prevImages) => [
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
  }, [lastVisible]);

  // TOGGLE SELECT
  function toggleSelectImage(imageId: string) {
    if (selectedImages.includes(imageId)) {
      setSelectedImages((prev) => prev.filter((id) => id !== imageId));
    } else {
      setSelectedImages((prev) => [...prev, imageId]);
    }
  }

  // SELECT ALL BY GROUP
  function selectAllFromGroup(group) {
    const newSelectedImages = group.map((image: { id: string }) => image.id);
    setSelectedImages((prev) => [...new Set([...prev, ...newSelectedImages])]);
  }

  // EDIT
  function editSelectedImages() {
    setAddToAlbumIsOpen(false);
    setModalIsOpen(true);
    setEditIsOpen(true);
  }

  // ADD TO ALBUM
  function addToAlbum() {
    setEditIsOpen(false);
    setModalIsOpen(true);
    setAddToAlbumIsOpen(true);
  }

  // DELETE IMAGES
  async function deleteSelectedImages() {
    notificationCtx.showNotification({
      title: 'Deleting...',
      message: 'Please wait. Deleting',
      status: 'Pending',
    });

    try {
      await deleteImages(selectedImages);
      const updatedImages = allImages.filter(
        (img) => !selectedImages.includes(img.id)
      );

      notificationCtx.showNotification({
        title: 'Success',
        message: 'Images deleted successfully',
        status: 'success',
      });

      setAllImages(updatedImages);
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

  // CLOSE MODAL
  const closeModal = () => {
    setModalIsOpen(false);
    setAddToAlbumIsOpen(false);
    setEditIsOpen(false);
  };

  // CLEAR SELECTED
  const handleClearSelectedImages = () => {
    setSelectedImages([]);
  };

  // REFRESH
  const handleRefreshImages = async () => {
    const newImages = await fetchImages({});
    setAllImages(newImages.images);
    setLastVisible(newImages.lastVisible);
  };

  // GROUP IMAGES
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

  const groupedImages = groupImagesByDateOrMonth(allImages);

  return {
    allImages,
    selectedImages,
    modalIsOpen,
    editIsOpen,
    addToAlbumIsOpen,
    loadMoreRef,
    groupedImages,
    toggleSelectImage,
    selectAllFromGroup,
    editSelectedImages,
    addToAlbum,
    deleteSelectedImages,
    closeModal,
    handleClearSelectedImages,
    handleRefreshImages,
  };
}
