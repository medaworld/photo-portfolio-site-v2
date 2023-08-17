import { styled } from 'styled-components';
import ImageCard from './ImageCard';

export const InfiniteItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;
`;

export const ImageContainer = styled.div`
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export default function InfiniteItemsBox({ allItems, onAdd, loadMoreRef }) {
  return (
    <InfiniteItemsContainer>
      {allItems.map((image) => (
        <ImageContainer key={image.id}>
          <ImageCard image={image} onAdd={onAdd} />
        </ImageContainer>
      ))}
      <div ref={loadMoreRef} />
    </InfiniteItemsContainer>
  );
}
