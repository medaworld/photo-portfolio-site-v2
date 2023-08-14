import CustomModal from '../../common/CustomModal';
import EditPhotos from './EditPhotosForm';
import AddToAlbum from './AddToAlbum';
import {
  AdminImageLibraryContainer,
  AdminImageLibraryInner,
} from './AdminImageLibraryStyles';

import BottomPanel from './BottomPanel';
import renderImagesGroup from './ImagesGroup';
import { useImageEdit } from '../../../hooks/useImageEdit';

export default function AdminPhotoLibrary({ imagesData }) {
  const {
    allPhotos,
    selectedImages,
    modalIsOpen,
    editIsOpen,
    addToAlbumIsOpen,
    loadMoreRef,
    toggleSelectImage,
    selectAllFromGroup,
    editSelectedImages,
    addToAlbum,
    deleteSelectedImages,
    closeModal,
    handleClearSelectedImages,
    handleRefreshImages,
    groupedImages,
  } = useImageEdit(imagesData);

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
          allPhotos={allPhotos}
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
