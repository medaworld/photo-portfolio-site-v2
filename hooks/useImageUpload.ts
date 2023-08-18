import { useCallback, useState, useContext } from 'react';
import { NotificationContext } from '../context/notification/NotificationContext';
import { compressImage } from '../utils/imageUtils';
import { extractFileNameWithoutExt } from '../utils/stringUtils';
import { addImage } from '../utils/firebaseUtils';

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

  const addFiles = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const removeFiles = () => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => !selectedFiles.includes(file))
    );
    setSelectedFiles([]);
  };

  const submitHandler = async (event: any) => {
    event.preventDefault();
    notificationCtx.showNotification({
      title: 'Uploading...',
      message: 'Please wait. Uploading',
      status: 'Pending',
    });

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        await addImage(file);
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
    selectedFiles,
    modalIsOpen,
    modalImage,
    setFiles,
    onDrop,
    viewFile,
    closeModal,
    toggleSelectedFile,
    onFileChange,
    addFiles,
    removeFile,
    removeFiles,
    submitHandler,
  };
};
