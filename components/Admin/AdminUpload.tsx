import { RefObject, useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Modal from 'react-modal';
import imageCompression from 'browser-image-compression';
import {
  AdminUploadContainer,
  Button,
  CloseButton,
  DragAndDropSection,
  FileName,
  Preview,
  PreviewGrid,
  PreviewImage,
  UploadButton,
  UploadNavBar,
  UploadNavButton,
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

  const inputRef: RefObject<HTMLInputElement> = useRef(null);

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
    if (inputRef.current) {
      inputRef.current.value = ''; // Clear the input here
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const removeFile = (file) => () => {
    setFiles((prev) => prev.filter((f) => f !== file));
    setSelectedFiles((prev) => prev.filter((f) => f !== file));
  };

  const viewFile = (file: any) => () => {
    setSelectedFile(file);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedFile(null);
    setModalIsOpen(false);
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

  const onFileChange = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const acceptedFiles = Object.values(event.target.files);
      onDrop(acceptedFiles);
    }
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

  const onSubmitClick = () => {
    // submitFiles(files)
    //   .then(() => {
    //     console.log('Submission successful');
    //     setFiles([]);  // Clear files after successful submission
    //     setSelectedFiles([]);  // Clear selection after successful submission
    //   })
    //   .catch((error) => {
    //     console.error('Submission failed', error);
    //   });
  };

  return (
    <AdminUploadContainer>
      <UploadNavBar>
        <div>
          <UploadNavButton onClick={onAddClick}>Add</UploadNavButton>
          <UploadNavButton onClick={onRemoveClick}>Remove</UploadNavButton>
        </div>
        <UploadButton>Upload</UploadButton>
      </UploadNavBar>
      <DragAndDropSection {...getRootProps()}>
        <input
          {...getInputProps()}
          hidden
          ref={inputRef}
          multiple
          onChange={onFileChange}
        />
        {files.length === 0 ? (
          <UploadSection>
            <p>Drag & drop photos and videos here</p>
            <p>or</p>
            <Button onClick={onAddClick}>Choose photos to upload</Button>
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
    </AdminUploadContainer>
  );
}
