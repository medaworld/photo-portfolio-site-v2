import { RefObject, useRef } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { useImageUpload } from '../../../hooks/useImageUpload';
import {
  AdminUploadContainer,
  AdminUploadInner,
  DragAndDropSection,
  ImageContainer,
  UploadSection,
} from './AdminUploadStyles';
import UploadNavbar from './UploadNavbar';
import PreviewGrid from './PreviewGrid';
import StyledButton from '../../common/StyledButton';
import CustomModal from '../../common/CustomModal';

export default function AdminUpload() {
  const inputRef: RefObject<HTMLInputElement> = useRef(null);
  const {
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
  } = useImageUpload({ inputRef });

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <AdminUploadContainer onSubmit={submitHandler}>
      <AdminUploadInner>
        <UploadNavbar onAddClick={addFiles} onRemoveClick={removeFiles} />
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
              <StyledButton
                variant="neutral"
                onClick={addFiles}
                type="button"
                style={{ padding: '10px' }}
              >
                Choose photos to upload
              </StyledButton>
            </UploadSection>
          ) : (
            <>
              <PreviewGrid
                files={files}
                setFiles={setFiles}
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
                      width={500}
                      height={500}
                      className={'image'}
                      layout="responsive"
                    />
                  </ImageContainer>
                )}
              </CustomModal>
            </>
          )}
        </DragAndDropSection>
      </AdminUploadInner>
    </AdminUploadContainer>
  );
}
