import ImageCard from '../../common/ImageCard';
import StyledButton from '../../common/StyledButton';
import { ImageGroup, ImageWrapper } from './ImagesGroupStyles';

export default function renderImagesGroup(
  groupedImages,
  { selectAllFromGroup, toggleSelectImage, selectedImages }
) {
  return Object.keys(groupedImages).map((date) => (
    <div key={date}>
      <h2>
        {date} -{' '}
        <StyledButton
          variant="neutral"
          type="button"
          onClick={() => selectAllFromGroup(groupedImages[date])}
        >
          Select All
        </StyledButton>
      </h2>
      <ImageGroup>
        {groupedImages[date].map((image) => (
          <ImageWrapper
            key={image.id}
            onClick={() => toggleSelectImage(image.id)}
            isSelected={selectedImages.includes(image.id)}
          >
            <ImageCard image={image} />
          </ImageWrapper>
        ))}
      </ImageGroup>
    </div>
  ));
}
