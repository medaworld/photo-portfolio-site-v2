import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { firestore, storage } from '../lib/firebase';
import { Album, Collection, FetchImagesOptions } from '../types/firebase';

// FETCH COUNT
export async function fetchCount(collectionName: string) {
  const querySnapshot = await getDocs(collection(firestore, collectionName));

  if (querySnapshot) {
    return querySnapshot.size;
  } else {
    console.error(`No such document for collection: ${collectionName}!`);
    return 0;
  }
}

// FETCH IMAGE URL FROM STORAGE
export async function fetchImageFromStorage(storage, imagePath) {
  const storageRef = ref(storage, imagePath);
  const url = await getDownloadURL(storageRef);
  return url;
}

// FETCH IMAGE URL
export async function fetchImageUrl(imageId: string) {
  const imageRef = doc(firestore, 'images', imageId);
  const imageSnapshot = await getDoc(imageRef);
  if (imageSnapshot.exists()) {
    return imageSnapshot.data().url;
  }
  return null;
}

// FETCH COVER URL
export async function fetchCoverUrl(coverId: string) {
  const albumRef = doc(firestore, 'albums', coverId);
  const albumSnapshot = await getDoc(albumRef);
  if (albumSnapshot.exists()) {
    return await fetchImageUrl(albumSnapshot.data().cover);
  }
  return null;
}

// REMOVE PHOTO FROM ALBUM
async function removePhotoIdFromAlbums(photoId: string) {
  const q = query(
    collection(firestore, 'albums'),
    where('photos', 'array-contains', photoId)
  );
  const albumsSnapshot = await getDocs(q);

  if (albumsSnapshot.empty) {
    console.log('No albums found with the photoId:', photoId);
    return;
  }

  const batch = writeBatch(firestore);

  albumsSnapshot.docs.forEach((docSnapshot) => {
    const albumData = docSnapshot.data() as Album;
    const updatedPhotos = albumData.photos.filter((id) => id !== photoId);

    const albumDoc = doc(firestore, 'albums', docSnapshot.id);
    batch.update(albumDoc, { photos: updatedPhotos });
  });

  await batch.commit();
}

// REMOVE PHOTO FROM COVER
async function removePhotoIdFromAlbumCover(photoId: string) {
  const q = query(
    collection(firestore, 'albums'),
    where('cover', '==', photoId)
  );

  const albumsSnapshot = await getDocs(q);

  if (albumsSnapshot.empty) {
    console.log('No albums found with the cover photoId:', photoId);
    return;
  }

  const batch = writeBatch(firestore);

  albumsSnapshot.docs.forEach((docSnapshot) => {
    const albumData = docSnapshot.data() as Album;
    const firstPhoto = albumData.photos[0] || null;

    const albumDoc = doc(firestore, 'albums', docSnapshot.id);
    batch.update(albumDoc, { cover: firstPhoto || null });
  });

  await batch.commit();
}

// FETCH IMAGES
export async function fetchImages({
  orderByField = 'uploadedAt',
  orderDirection = 'desc',
  lastVisible = null,
  limitCount = 20,
}: FetchImagesOptions) {
  let imagesQuery = query(
    collection(firestore, 'images'),
    orderBy(orderByField, orderDirection),
    limit(limitCount)
  );

  if (lastVisible) {
    const lastVisibleDoc = await getDoc(doc(firestore, 'images', lastVisible));

    imagesQuery = query(
      collection(firestore, 'images'),
      orderBy(orderByField, orderDirection),
      startAfter(lastVisibleDoc),
      limit(limitCount)
    );
  }

  const snapshot = await getDocs(imagesQuery);

  const images = snapshot.docs.map((doc) => {
    const data = doc.data();

    if (data.uploadedAt && typeof data.uploadedAt.toDate === 'function') {
      data.uploadedAt = data.uploadedAt.toDate().toISOString();
    }
    if (data.dateTaken && typeof data.dateTaken.toDate === 'function') {
      data.dateTaken = data.dateTaken.toDate().toISOString();
    }

    return {
      id: doc.id,
      ...data,
    };
  });

  if (images[images.length - 1]?.id) {
    lastVisible = images[images.length - 1].id;
  } else {
    lastVisible = null;
  }

  return {
    images,
    lastVisible: lastVisible,
  };
}

// UPDATE IMAGES
export async function updateImages(selectedImages, imageData) {
  const updatePromises = selectedImages.map(async (imageId) => {
    const imageRef = doc(firestore, 'images', imageId);
    await updateDoc(imageRef, imageData);
  });

  await Promise.all(updatePromises);
}

// DELETE IMAGES
export async function deleteImages(selectedImages) {
  const deletePromises = selectedImages.map(async (imageId) => {
    const docRef = doc(firestore, 'images', imageId);
    await deleteDoc(docRef);

    const imageRef = ref(storage, `images/${imageId}`);
    await deleteObject(imageRef);

    await removePhotoIdFromAlbums(imageId);
    await removePhotoIdFromAlbumCover(imageId);
  });

  await Promise.all(deletePromises);
}

// FETCH ALBUMS
export async function fetchAlbums() {
  const albumsRef = collection(firestore, 'albums');

  const snapshot = await getDocs(albumsRef);

  const albums = await Promise.all(
    snapshot.docs.map(async (docSnapshot) => {
      const docData = docSnapshot.data();

      let coverImageUrl = null;
      if (docData.cover) {
        coverImageUrl = await fetchImageUrl(docData.cover);
      }

      return {
        id: docData.id,
        cover: coverImageUrl,
        title: docData.title,
        photos: docData.photos,
        count: docData.photos ? docData.photos.length : 0,
      };
    })
  );

  return albums;
}

// FETCH ALBUM DATA
export async function fetchAlbumData(albumId: string): Promise<Album> {
  const albumRef = doc(firestore, 'albums', albumId);
  const albumSnapshot = await getDoc(albumRef);

  if (albumSnapshot.exists()) {
    const data = albumSnapshot.data();

    let coverURL = null;
    if (data.cover) {
      coverURL = await fetchImageUrl(data.cover);
    }

    const cover = { id: data.cover, url: coverURL };

    const photosRefs = data.photos.map((id) => doc(firestore, 'images', id));
    const photosSnapshots = await Promise.all(
      photosRefs.map((ref) => getDoc(ref))
    );
    const photosURLs = photosSnapshots.map((snapshot) => snapshot.data()?.url);
    const photos = data.photos.map((id, index) => {
      return { id: id, url: photosURLs[index] };
    });

    return {
      ...data,
      createdAt: data.createdAt.toDate().toISOString(),
      dateTaken: data.dateTaken ? data.dateTaken.toDate().toISOString() : null,
      cover,
      photos,
    } as Album;
  }

  throw new Error(`Album with ID ${albumId} not found.`);
}

// ADD ALBUM
export async function addAlbum(albumData) {
  const albumsRef = collection(firestore, 'albums');
  const docRef = await addDoc(albumsRef, albumData);

  await updateDoc(docRef, {
    id: docRef.id,
    createdAt: Timestamp.now(),
  });

  return docRef.id;
}

// UPDATE ALBUM
export async function updateAlbum(albumData) {
  const albumRef = doc(firestore, 'albums', albumData.id);
  await updateDoc(albumRef, albumData);
}

// DELETE ALBUM
export async function deleteAlbum(albumId) {
  const albumRef = doc(firestore, 'albums', albumId);
  await deleteDoc(albumRef);

  console.log('Album deleted successfully.');
}

// FETCH COLLECTIONS
export async function fetchCollections() {
  const collectionsRef = collection(firestore, 'collections');

  const snapshot = await getDocs(collectionsRef);

  const collections = await Promise.all(
    snapshot.docs.map(async (docSnapshot) => {
      const docData = docSnapshot.data();

      let coverURL = null;
      if (docData.cover) {
        coverURL = await fetchCoverUrl(docData.cover);
      }

      return {
        id: docData.id,
        cover: coverURL,
        title: docData.title,
        albums: docData.albums,
        count: docData.albums ? docData.albums.length : 0,
      };
    })
  );

  return collections;
}

// FETCH COLLECTION DATA
export async function fetchCollectionData(
  collectionId: string
): Promise<Collection> {
  const collectionRef = doc(firestore, 'collections', collectionId);
  const collectionSnapshot = await getDoc(collectionRef);

  if (collectionSnapshot.exists()) {
    const data = collectionSnapshot.data();

    let coverURL = null;
    if (data.cover) {
      coverURL = await fetchCoverUrl(data.cover);
    }

    const cover = { id: data.cover, url: coverURL };

    const albumRefs = data.albums.map((id: string) =>
      doc(firestore, 'albums', id)
    );

    const albumsSnapshots = await Promise.all(
      albumRefs.map((ref) => getDoc(ref))
    );

    const albums = await Promise.all(
      albumsSnapshots.map(async (snapshot) => {
        const album = snapshot.data();
        const coverId = snapshot.data()?.cover;
        const coverUrl = await fetchImageUrl(coverId);
        return {
          ...album,
          cover: coverUrl,
          createdAt: album.createdAt.toDate().toISOString(),
        };
      })
    );

    return {
      ...data,
      createdAt: data.createdAt.toDate().toISOString(),
      cover,
      albums,
    } as Collection;
  }

  throw new Error(`Collection with ID ${collectionId} not found.`);
}

// ADD COLLECTION
export async function addCollection(collectionData) {
  const collectionsRef = collection(firestore, 'collections');
  const docRef = await addDoc(collectionsRef, collectionData);

  await updateDoc(docRef, {
    id: docRef.id,
    createdAt: Timestamp.now(),
  });

  return docRef.id;
}

// UPDATE COLLECTION
export async function updateCollection(collectionData) {
  const collectionRef = doc(firestore, 'collections', collectionData.id);
  await updateDoc(collectionRef, collectionData);
}

// DELETE COLLECTION
export async function deleteCollection(collectionId) {
  const collectionRef = doc(firestore, 'collections', collectionId);
  await deleteDoc(collectionRef);

  console.log('Album deleted successfully.');
}

// FETCH CATEGORIES
export async function fetchCategories(db) {
  const categoriesCol = collection(db, 'categories');
  const categorySnapshot = await getDocs(categoriesCol);
  const categoryList = categorySnapshot.docs.map((doc) => doc.data());
  return categoryList;
}
