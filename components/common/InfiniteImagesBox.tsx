import { styled } from 'styled-components';
import ImageCard from './ImageCard';

export const InfiniteImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  height: 200px;
  overflow-y: auto;
  margin-bottom: 1rem;
`;

export const Photo = styled.div`
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export default function InfiniteImagesBox({
  allImages,
  addToAlbum,
  loadMoreRef,
}) {
  return (
    <InfiniteImagesContainer>
      {allImages.map((image) => (
        <Photo key={image.id}>
          <ImageCard image={image} handleAdd={addToAlbum} />
        </Photo>
      ))}
      <div ref={loadMoreRef} />
    </InfiniteImagesContainer>
  );
}
