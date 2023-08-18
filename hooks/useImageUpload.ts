import { useCallback, useState, useContext } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { NotificationContext } from '../context/notification/NotificationContext';
import { compressImage } from '../utils/imageUtils';
import { firestore, storage } from '../lib/firebase';
import { extractFileNameWithoutExt } from '../utils/stringUtils';

export const useImageUpload = ({ inputRef }) => {
  const notificationCtx = useContext(NotificationContext);
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [modalImage, setModalImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      try {
        notificationCtx.showNotification({
          title: 'Uploading...',
          message: 'Please wait. Adding files',
          status: 'Pending',
        });

        const compressedFiles = await Promise.all(
          acceptedFiles.map((file) => compressImage(file))
        );

        const fileObjects = compressedFiles.map((file) => ({
          blob: file,
          title: extractFileNameWithoutExt(file.name),
          description: '',
        }));

        setFiles((prev) => [...prev, ...fileObjects]);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
        notificationCtx.showNotification({
          title: 'Success',
          message: 'Files added successfully',
          status: 'success',
        });
      } catch (error) {
        console.error(`Failed to add file`, error);
        notificationCtx.showNotification({
          title: 'Error',
          message: error.text || 'Something went wrong',
          status: 'error',
        });
      }
    },
    [inputRef, notificationCtx]
  );

  const onFileChange = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const acceptedFiles = Object.values(event.target.files);
      onDrop(acceptedFiles);
    }
  };

  const removeFile = (file) => () => {
    setFiles((prev) => prev.filter((f) => f !== file));
    setSelectedFiles((prev) => prev.filter((f) => f !== file));
  };

  const viewFile = (file: any) => () => {
    setModalImage(file.blob);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalImage(null);
    setModalIsOpen(false);
  };

  const toggleSelectedFile = (file) => {
    setSelectedFiles((prevSelected) => {
      const isAlreadySelected = prevSelected.includes(file);

      if (isAlreadySelected) {
        return prevSelected.filter((selectedFile) => selectedFile !== file);
      } else {
        return [...prevSelected, file];
      }
    });
  };

  const onAddClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onRemoveClick = () => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => !selectedFiles.includes(file))
    );
    setSelectedFiles([]);
  };

  const onSubmitClick = async (e) => {
    e.preventDefault();
    notificationCtx.showNotification({
      title: 'Uploading...',
      message: 'Please wait. Uploading',
      status: 'Pending',
    });

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const docRef = await addDoc(collection(firestore, 'images'), {
        title: file.title,
        description: file.description,
        uploadedAt: serverTimestamp(),
      });

      const storageRef = ref(storage, `images/${docRef.id}`);

      try {
        await uploadBytes(storageRef, file.blob);

        const downloadURL = await getDownloadURL(storageRef);

        await updateDoc(docRef, { url: downloadURL });

        setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
      } catch (error) {
        console.error(`Failed to upload image ${i + 1}:`, error);
        notificationCtx.showNotification({
          title: 'Error',
          message: error.text || 'Something went wrong',
          status: 'error',
        });
      }
    }
    notificationCtx.showNotification({
      title: 'Success',
      message: 'Images uploaded successfully',
      status: 'success',
    });
  };
  return {
    files,
    setFiles,
    onDrop,
    removeFile,
    viewFile,
    closeModal,
    toggleSelectedFile,
    onFileChange,
    onAddClick,
    onRemoveClick,
    onSubmitClick,
    selectedFiles,
    setSelectedFiles,
    modalIsOpen,
    setModalIsOpen,
    modalImage,
  };
};
