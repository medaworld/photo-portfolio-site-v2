import { MdEdit, MdPhotoAlbum, MdDelete } from 'react-icons/md';
import StyledButton from '../../common/StyledButton';
import {
  BottomActions,
  BottomPanelContainer,
  ImagePreview,
  TopActions,
} from './BottomPanelStyles';

export default function BottomPanel({
  selectedImages,
  allPhotos,
  handleClearSelectedImages,
  editSelectedImages,
  addToAlbum,
  deleteSelectedImages,
}) {
  return (
    <BottomPanelContainer>
      <TopActions>
        <div>
          <span>{selectedImages.length} selected</span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '0.5rem',
            }}
          >
            {allPhotos
              .filter((img) => selectedImages.includes(img.id))
              .slice(0, 4)
              .map((img) => (
                <ImagePreview key={img.id}>
                  <picture>
                    <img src={img.url} alt={img.description} />
                  </picture>
                </ImagePreview>
              ))}
            {selectedImages.length > 4 && (
              <span>+{selectedImages.length - 4} more</span>
            )}
          </div>
        </div>
        <StyledButton
          variant="neutral"
          type="button"
          onClick={handleClearSelectedImages}
        >
          Clear Selection
        </StyledButton>
      </TopActions>

      <BottomActions>
        <StyledButton
          variant="neutral"
          type="button"
          onClick={editSelectedImages}
        >
          <MdEdit /> Edit
        </StyledButton>

        <StyledButton variant="neutral" type="button" onClick={addToAlbum}>
          <MdPhotoAlbum /> Add to Album
        </StyledButton>

        <StyledButton
          variant="error"
          type="button"
          onClick={deleteSelectedImages}
        >
          <MdDelete /> Delete
        </StyledButton>
      </BottomActions>
    </BottomPanelContainer>
  );
}
