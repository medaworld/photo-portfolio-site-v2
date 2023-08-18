import { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import {
  deleteAlbum,
  deleteCollection,
  fetchAlbums,
  fetchImages,
  updateAlbum,
  updateCollection,
} from '../utils/firebaseUtils';
import { capitalizeFirstLetter } from '../utils/stringUtils';
import { NotificationContext } from '../context/notification/NotificationContext';

export default function useCollectionEdit(collection, type) {
  const pluralType = type + 's';
  const [items, setItems] = useState(
    collection.photos || collection.albums || []
  );
  const [allItems, setAllItems] = useState([]);
  const [lastVisible, setLastVisible] = useState();
  const [cover, setCover] = useState(collection.cover);
  const [enteredTitle, setEnteredTitle] = useState(collection.title || '');
  const [enteredDescription, setEnteredDescription] = useState(
    collection.description || ''
  );
  const [enteredDate, setEnteredDate] = useState(collection.date || null);
  const [addItems, setAddItems] = useState(false);
  const notificationCtx = useContext(NotificationContext);
  const router = useRouter();
  const loadMoreRef = useRef(null);

  async function handleDeleteCollection(event) {
    event.preventDefault();
    const isConfirmed = window.confirm(
      `Are you sure you want to delete this ${type}?`
    );
    if (isConfirmed) {
      notificationCtx.showNotification({
        title: 'Deleting...',
        message: `Please wait. Deleting ${type}`,
        status: 'Pending',
      });
      try {
        type === 'collection'
          ? await deleteCollection(collection.id)
          : await deleteAlbum(collection.id);
        notificationCtx.showNotification({
          title: 'Success',
          message: `${capitalizeFirstLetter(type)} deleted successfully`,
          status: 'success',
        });
        router.push(`/secure/admin/${pluralType}`);
      } catch (error) {
        console.error(`Error deleting ${type}: `, error);
        notificationCtx.showNotification({
          title: 'Error',
          message: `An error occurred while deleting ${type}. Please try again.`,
          status: 'error',
        });
      }
    }
  }

  async function submitHandler(event: any) {
    event.preventDefault();
    notificationCtx.showNotification({
      title: 'Saving...',
      message: 'Please wait. Saving changes',
      status: 'Pending',
    });
    try {
      const itemsData = items.map((item) => {
        return item.id;
      });
      let collectionData: any;
      if (type === 'collection') {
        collectionData = {
          title: enteredTitle,
          description: enteredDescription,
          cover: cover.id,
          albums: itemsData,
          id: collection.id,
        };
        await updateCollection(collectionData);
      } else {
        collectionData = {
          title: enteredTitle,
          description: enteredDescription,
          dateTaken: enteredDate,
          cover: cover.id,
          photos: itemsData,
          id: collection.id,
        };
        await updateAlbum(collectionData);
      }

      notificationCtx.showNotification({
        title: 'Success',
        message: 'Album updated successfully',
        status: 'success',
      });
      router.push(`/secure/admin/${pluralType}`);
    } catch (error) {
      console.error('Error saving: ', error);
      notificationCtx.showNotification({
        title: 'Error',
        message: 'An error occurred while saving changes. Please try again.',
        status: 'error',
      });
    }
  }

  function handleSetCover(item: any) {
    setCover(item);
  }

  function handleRemoveItem(id) {
    if (cover.id === id) {
      setCover(null);
    }
    setItems((prev: any[]) => prev.filter((item) => item.id !== id));
  }

  function handleAddItemToCollection(item: any) {
    if (!items.some((existingItem) => existingItem.id === item.id)) {
      setItems([...items, item]);
    }
  }

  async function showAllItems() {
    if (type === 'collection') {
      const albums = await fetchAlbums();
      setAllItems(albums);
    } else {
      const images = await fetchImages({});
      setAllItems(images.images);
      setLastVisible(images.lastVisible);
    }
    setAddItems(true);
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

  return {
    pluralType,
    cover,
    enteredTitle,
    enteredDescription,
    enteredDate,
    items,
    addItems,
    allItems,
    loadMoreRef,
    setEnteredTitle,
    setEnteredDescription,
    setEnteredDate,
    setItems,
    handleSetCover,
    handleRemoveItem,
    handleAddItemToCollection,
    showAllItems,
    handleDeleteCollection,
    submitHandler,
  };
}
