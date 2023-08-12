import {
  OrderByDirection,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { firestore } from '../lib/firebase';
import { Album, FetchImagesOptions } from '../types/firebase';

export async function fetchImageFromStorage(storage, imagePath) {
  const storageRef = ref(storage, imagePath);
  const url = await getDownloadURL(storageRef);
  return url;
}

export async function fetchCategories(db) {
  const categoriesCol = collection(db, 'categories');
  const categorySnapshot = await getDocs(categoriesCol);
  const categoryList = categorySnapshot.docs.map((doc) => doc.data());
  return categoryList;
}

export async function fetchAlbumData(albumId: string): Promise<Album> {
  const albumRef = doc(firestore, 'albums', albumId);
  const albumSnapshot = await getDoc(albumRef);

  if (albumSnapshot.exists()) {
    const data = albumSnapshot.data();

    // Fetch cover image
    const coverURL = await fetchImageUrl(data.cover);
    const cover = { id: data.cover, url: coverURL };

    // Fetch photos
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
      cover,
      photos,
    } as Album;
  }

  throw new Error(`Album with ID ${albumId} not found.`);
}

export async function uploadImageToFirebaseStorage(image, imagePath) {}

export async function fetchImageUrl(imageId: string) {
  const imageRef = doc(firestore, 'images', imageId);
  const imageSnapshot = await getDoc(imageRef);
  if (imageSnapshot.exists()) {
    return imageSnapshot.data().url;
  }
  return null;
}

export async function fetchAlbums() {
  const albumsRef = collection(firestore, 'albums');

  const snapshot = await getDocs(albumsRef);

  const albums = await Promise.all(
    snapshot.docs.map(async (docSnapshot) => {
      const docData = docSnapshot.data();

      const coverImageUrl = await fetchImageUrl(docData.cover);

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

export async function fetchImages({
  orderByField = 'uploadedAt',
  orderDirection = 'desc',
  lastVisible = null,
  limitCount = 20,
}: FetchImagesOptions) {
  try {
    let imagesQuery = query(
      collection(firestore, 'images'),
      orderBy(orderByField, orderDirection),
      limit(limitCount)
    );

    if (lastVisible) {
      const lastVisibleDoc = await getDoc(
        doc(firestore, 'images', lastVisible)
      );

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

    return {
      images,
      lastVisible: images[images.length - 1].id,
    };
  } catch (error) {
    console.error('Error fetching images:', error);
    return {};
  }
}
