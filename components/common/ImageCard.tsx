import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { styled } from 'styled-components';

export const ImageCardContainer = styled.div`
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;

  > div {
    position: unset !important;
  }

  .image {
    object-fit: cover;
    width: 100% !important;
    position: relative !important;
    height: 100% !important;
  }
`;

export const CoverIcon = styled.div<{ isCover: boolean }>`
  position: absolute;
  bottom: 5px;
  left: 5px;
  cursor: pointer;
  color: ${(props) => (props.isCover ? ' #ffd700' : 'white')};
  opacity: 0.8;
  transition: all 0.2s ease;

  &:hover {
    color: #ffd700;
    opacity: 1;
  }
`;

export const DeleteIcon = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  cursor: pointer;
  opacity: 0.7;
  color: #ff0000;
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

export const Title = styled.div`
  position: absolute;
  left: 5px;
  top: 5px;
  font-family: 'Raleway';
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  max-width: 80%;
`;

type PhotoCardProps = {
  image: any;
  size?: number;
  onSetCover?: (image) => void;
  onRemove?: (id) => void;
  onAdd?: (image) => void;
  cover?: any;
};

export default function ImageCard({
  image,
  size = 150,
  cover,
  onSetCover,
  onRemove,
  onAdd,
}: PhotoCardProps) {
  const isCover = image.id === cover?.id;

  return (
    <ImageCardContainer
      style={{ width: size, height: size }}
      onClick={onAdd ? () => onAdd(image) : () => {}}
    >
      <ImageContainer>
        <Image
          src={image.url || image.cover}
          alt={image.title || 'Image'}
          className={'image'}
          width={400}
          height={400}
        />
      </ImageContainer>
      <Title>{image.title}</Title>
      {onSetCover && (
        <CoverIcon onClick={() => onSetCover(image)} isCover={isCover}>
          <FaStar size={20} />
        </CoverIcon>
      )}
      {onRemove && (
        <DeleteIcon onClick={() => onRemove(image.id)}>
          <MdDelete size={20} />
        </DeleteIcon>
      )}
    </ImageCardContainer>
  );
}
