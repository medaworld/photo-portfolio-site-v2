import { useState, useEffect, useContext, useRef } from 'react';
import { NotificationContext } from '../context/notification/NotificationContext';
import { addAlbum, addCollection, fetchImages } from '../utils/firebaseUtils';
import { useRouter } from 'next/router';
import { capitalizeFirstLetter, titleToPath } from '../utils/stringUtils';

export function useCollectionAdd(items, type) {
  const notificationCtx = useContext(NotificationContext);
  const [allItems, setAllItems] = useState(items.images || items);
  const [lastVisible, setLastVisible] = useState(items.lastVisible || null);
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredDescription, setEnteredDescription] = useState('');
  const [enteredDate, setEnteredDate] = useState<Date>();
  const [selectedItems, setSelectedItems] = useState([]);
  const [cover, setCover] = useState(null);
  const loadMoreRef = useRef(null);
  const router = useRouter();
  const pluralType = type + 's';

  // INFINITE SCROLL
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

  // INPUT CHANGE
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

  // ADD TO COLLECTION
  const addToCollection = (item) => {
    if (!selectedItems.some((existingItem) => existingItem.id === item.id)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // REMOVE FROM COLLECTION
  function removeFromCollection(id) {
    if (cover?.id === id) {
      setCover(null);
    }
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  }

  // SET COVER
  function handleSetCover(photo) {
    setCover(photo);
  }

  // SUBMIT
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
          pathTitle: titleToPath(enteredTitle),
          description: enteredDescription,
          cover: cover.id,
          albums: selectedItemsIds,
        };
        await addCollection(collectionData);
      } else {
        collectionData = {
          title: enteredTitle,
          pathTitle: titleToPath(enteredTitle),
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

  return {
    pluralType,
    enteredTitle,
    enteredDescription,
    enteredDate,
    cover,
    selectedItems,
    allItems,
    loadMoreRef,
    handleInputChange,
    setEnteredDate,
    setSelectedItems,
    handleSetCover,
    removeFromCollection,
    addToCollection,
    submitHandler,
  };
}
