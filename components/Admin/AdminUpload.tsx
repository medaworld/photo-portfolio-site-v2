import { RefObject, useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Modal from 'react-modal';
import imageCompression from 'browser-image-compression';
import {
  Button,
  CloseButton,
  DragAndDropSection,
  FileName,
  Preview,
  PreviewGrid,
  PreviewImage,
  UploadSection,
  ViewButton,
} from './AdminUploadStyles';
import { CloseIcon } from '../common/CloseIcon';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: '5',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
};

export default function AdminUpload() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const inputRef: RefObject<HTMLInputElement> = useRef();

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
      onProgress: undefined,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error('Image compression failed:', error);
      return file;
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const compressedFiles = await Promise.all(
      acceptedFiles.map((file) => compressImage(file))
    );
    setFiles((prev) => [...prev, ...compressedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const removeFile = (file) => () => {
    setFiles((prev) => prev.filter((f) => f !== file));
  };

  const viewFile = (file) => () => {
    setSelectedFile(file);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedFile(null);
    setModalIsOpen(false);
  };

  const openFileChooser = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const toggleSelectedFile = (file) => {
    setSelectedFiles((prevSelected) => {
      // Check if file is already selected
      const isAlreadySelected = prevSelected.includes(file);

      if (isAlreadySelected) {
        // If already selected, remove from array
        return prevSelected.filter((selectedFile) => selectedFile !== file);
      } else {
        // Else add to array
        return [...prevSelected, file];
      }
    });
  };

  return (
    <DragAndDropSection {...getRootProps()}>
      {files.length === 0 ? (
        <UploadSection>
          <input {...getInputProps()} ref={inputRef} />
          <p>Drag & drop photos and videos here</p>
          <p>or</p>
          <Button onClick={openFileChooser}>Choose photos to upload</Button>
        </UploadSection>
      ) : (
        <>
          <PreviewGrid>
            {files.map((file) => (
              <Preview
                key={file.path}
                onClick={() => toggleSelectedFile(file)}
                selected={selectedFiles.includes(file)}
              >
                <PreviewImage
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                ></PreviewImage>
                <CloseButton onClick={removeFile(file)}>
                  <CloseIcon color={'white'} />
                </CloseButton>
                <ViewButton onClick={viewFile(file)}>🔍</ViewButton>
                <FileName>{file.name}</FileName>
              </Preview>
            ))}
          </PreviewGrid>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Image Preview"
            style={customStyles}
          >
            {selectedFile && (
              <picture>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt={selectedFile.name}
                />
              </picture>
            )}
          </Modal>
        </>
      )}
    </DragAndDropSection>
  );
}
