import { MdEdit, MdPhotoAlbum, MdDelete } from 'react-icons/md';
import StyledButton from './StyledButton';
import { styled } from 'styled-components';

const BottomPanelContainer = styled.div`
  position: sticky;
  bottom: 0;
  background-color: ${(props) => props.theme.tpBackground};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-top: 1px solid ${(props) => props.theme.lightBorder};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TopActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const BottomActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const ImagePreview = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 5px;
  margin-right: 8px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function BottomPanel({
  selectedImages,
  allImages,
  handleClearSelectedImages,
  editSelectedImages,
  addToAlbum,
  deleteSelectedImages,
  type,
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
            {allImages
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
          <MdDelete /> {type === 'upload' ? 'Remove' : 'Delete'}
        </StyledButton>
      </BottomActions>
    </BottomPanelContainer>
  );
}
