import { styled } from 'styled-components';

export const InfiniteImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  height: 200px;
  overflow-y: auto;
  margin-bottom: 1rem;
`;

export const Photo = styled.div`
  width: 100px;
  height: 100px;
  background-size: cover;
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
        <Photo
          key={image.id}
          style={{ backgroundImage: `url(${image.url})` }}
          onClick={() => addToAlbum(image)}
        />
      ))}
      <div ref={loadMoreRef} />
    </InfiniteImagesContainer>
  );
}
