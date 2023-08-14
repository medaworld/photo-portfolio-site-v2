import { RefObject, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  AdminUploadContainer,
  DragAndDropSection,
  ImageContainer,
  UploadSection,
} from './AdminUploadStyles';
import UploadNavbar from './UploadNavbar';
import PreviewGrid from './PreviewGrid';
import { useImageUpload } from '../../../hooks/useImageUpload';
import StyledButton from '../../common/StyledButton';
import CustomModal from '../../common/CustomModal';
import Image from 'next/image';

export default function AdminUpload() {
  const inputRef: RefObject<HTMLInputElement> = useRef(null);
  const {
    files,
    selectedFiles,
    modalIsOpen,
    modalImage,
    onDrop,
    removeFile,
    viewFile,
    closeModal,
    toggleSelectedFile,
    onFileChange,
    onAddClick,
    onRemoveClick,
    onSubmitClick,
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
          accept="image/jpeg, image/png, image/jpg"
        />
        {files.length === 0 ? (
          <UploadSection>
            <p>Drag & drop photos and videos here</p>
            <p>or</p>
            <StyledButton variant="neutral" onClick={onAddClick} type="button">
              Choose photos to upload
            </StyledButton>
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
            <CustomModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
              {modalImage && (
                <ImageContainer>
                  <Image
                    src={URL.createObjectURL(modalImage)}
                    alt={''}
                    width={700}
                    height={700}
                    className={'image'}
                    layout="responsive"
                  />
                </ImageContainer>
              )}
            </CustomModal>
          </>
        )}
      </DragAndDropSection>
    </AdminUploadContainer>
  );
}
