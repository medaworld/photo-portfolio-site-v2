import { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import {
  deleteAlbum,
  deleteCollection,
  fetchAlbums,
  fetchImages,
  updateAlbum,
  updateCollection,
} from '../../../../utils/firebaseUtils';
import { capitalizeFirstLetter } from '../../../../utils/stringUtils';

import { NotificationContext } from '../../../../context/notification/NotificationContext';
import StyledButton from '../../../common/StyledButton';
import InfiniteItemsBox from '../../../common/InfiniteItemsBox';
import BackLink from '../../../common/BackLink';
import CoverCard from '../../../common/CoverCard';
import DragDropRow from '../../../common/DragDropRow';
import {
  AdminEditCollectionsContainer,
  Buttons,
} from './AdminEditCollectionStyles';

export default function AdminEditCollection({ collection, type }) {
  const pluralType = type + 's';
  const itemType = type === 'collection' ? 'Albums' : 'Images';
  const [items, setItems] = useState(
    collection.photos || collection.albums || []
  );
  const [allItems, setAllItems] = useState([]);
  const [lastVisible, setLastVisible] = useState([]);
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
        console.log(collectionData);
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
    const albums = await fetchAlbums();
    setAllItems(albums);
    setAddItems(true);
  }

  useEffect(() => {
    if (type === 'albums') {
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
    <AdminEditCollectionsContainer>
      <BackLink
        href={`/secure/admin/${pluralType}`}
        text={`Back to ${pluralType}`}
      />

      <CoverCard
        cover={cover}
        enteredTitle={enteredTitle}
        setEnteredTitle={setEnteredTitle}
        enteredDescription={enteredDescription}
        setEnteredDescription={setEnteredDescription}
        enteredDate={enteredDate}
        setEnteredDate={setEnteredDate}
      />

      <h4>{`${itemType} in ${type}`}:</h4>
      <DragDropRow
        items={items}
        setItems={setItems}
        onSetCover={handleSetCover}
        onRemove={handleRemoveItem}
        cover={cover}
      />

      {addItems ? (
        <>
          <h4>{`All ${itemType}:`}</h4>
          <InfiniteItemsBox
            allItems={allItems}
            onAdd={handleAddItemToCollection}
            loadMoreRef={loadMoreRef}
          />
        </>
      ) : (
        <StyledButton
          variant="neutral"
          onClick={showAllItems}
          style={{ margin: '1rem 0' }}
        >
          Add more images
        </StyledButton>
      )}

      <Buttons>
        <StyledButton
          variant="error"
          type="button"
          onClick={handleDeleteCollection}
          style={{ display: 'block' }}
        >
          Delete {type}
        </StyledButton>
        <StyledButton variant="primary" onClick={submitHandler}>
          Save changes
        </StyledButton>
      </Buttons>
    </AdminEditCollectionsContainer>
  );
}
