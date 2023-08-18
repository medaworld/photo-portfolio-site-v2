import CustomModal from '../../common/CustomModal';
import EditPhotos from './EditPhotosForm';
import AddToAlbum from './AddToAlbum';
import {
  AdminImageLibraryContainer,
  AdminImageLibraryInner,
} from './AdminImageLibraryStyles';

import BottomPanel from '../../common/BottomPanel';
import renderImagesGroup from './ImagesGroup';
import { useImageEdit } from '../../../hooks/useImageEdit';

export default function AdminPhotoLibrary({ images }) {
  const {
    allImages,
    selectedImages,
    modalIsOpen,
    editIsOpen,
    addToAlbumIsOpen,
    loadMoreRef,
    groupedImages,
    toggleSelectImage,
    selectAllFromGroup,
    editSelectedImages,
    addToAlbum,
    deleteSelectedImages,
    closeModal,
    handleClearSelectedImages,
    handleRefreshImages,
  } = useImageEdit(images);

  return (
    <AdminImageLibraryContainer>
      <AdminImageLibraryInner>
        <h1>Image Library</h1>
        <p>Date uploaded</p>
        {renderImagesGroup(groupedImages, {
          selectAllFromGroup,
          toggleSelectImage,
          selectedImages,
        })}
        <div ref={loadMoreRef} />
      </AdminImageLibraryInner>
      {selectedImages.length > 0 && (
        <BottomPanel
          selectedImages={selectedImages}
          allImages={allImages}
          handleClearSelectedImages={handleClearSelectedImages}
          editSelectedImages={editSelectedImages}
          addToAlbum={addToAlbum}
          deleteSelectedImages={deleteSelectedImages}
        />
      )}
      <CustomModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
        {editIsOpen && (
          <EditPhotos
            selectedImages={selectedImages}
            clearSelectedImages={handleClearSelectedImages}
            refreshImages={handleRefreshImages}
            closeModal={closeModal}
          />
        )}
        {addToAlbumIsOpen && (
          <AddToAlbum selectedImages={selectedImages} closeModal={closeModal} />
        )}
      </CustomModal>
    </AdminImageLibraryContainer>
  );
}
