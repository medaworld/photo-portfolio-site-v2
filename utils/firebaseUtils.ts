import { collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export async function fetchCategories(db) {
  const categoriesCol = collection(db, 'categories');
  const categorySnapshot = await getDocs(categoriesCol);
  const categoryList = categorySnapshot.docs.map((doc) => doc.data());
  return categoryList;
}

export async function fetchImage(storage, imagePath) {
  const storageRef = ref(storage, imagePath);
  const url = await getDownloadURL(storageRef);
  return url;
}

export async function uploadImageToFirebaseStorage(image, imagePath) {}
