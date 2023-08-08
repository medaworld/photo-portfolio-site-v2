import { RefObject, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  AdminUploadContainer,
  Button,
  DragAndDropSection,
  UploadSection,
} from './AdminUploadStyles';
import UploadNavbar from './UploadNavbar';
import PreviewGrid from './PreviewGrid';
import ImagePreviewModal from './ImagePreviewModal';
import { useImageUpload } from '../../../hooks/useImageUpload';

export default function AdminUpload() {
  const inputRef: RefObject<HTMLInputElement> = useRef(null);
  const {
    files,
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
    modalIsOpen,
    modalImage,
  } = useImageUpload({ inputRef });

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <AdminUploadContainer onSubmit={onSubmitClick}>
      <UploadNavbar onAddClick={onAddClick} onRemoveClick={onRemoveClick} />
      <DragAndDropSection {...getRootProps()}>
        <input
          {...getInputProps()}
          hidden
          type="file"
          name="image"
          ref={inputRef}
          multiple
          onChange={onFileChange}
        />
        {files.length === 0 ? (
          <UploadSection>
            <p>Drag & drop photos and videos here</p>
            <p>or</p>
            <Button onClick={onAddClick} type="button">
              Choose photos to upload
            </Button>
          </UploadSection>
        ) : (
          <>
            <PreviewGrid
              files={files}
              toggleSelectedFile={toggleSelectedFile}
              removeFile={removeFile}
              viewFile={viewFile}
              selectedFiles={selectedFiles}
            />
            <ImagePreviewModal
              modalIsOpen={modalIsOpen}
              closeModal={closeModal}
              selectedFile={modalImage}
            />
          </>
        )}
      </DragAndDropSection>
    </AdminUploadContainer>
  );
}
