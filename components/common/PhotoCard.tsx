import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { styled } from 'styled-components';

export const PhotoCardContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;

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
  color: ${(props) => (props.isCover ? ' #ffd700' : props.theme.background)};
  opacity: 0.7;
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

export default function PhotoCard({
  photo,
  handleSetCover,
  handleDeletePhoto,
  cover,
}) {
  const isCover = photo.id === cover?.id;

  return (
    <PhotoCardContainer>
      <ImageContainer>
        <Image
          src={photo.url}
          alt={photo.title || 'Image'}
          className={'image'}
          width={400}
          height={400}
        />
      </ImageContainer>
      <CoverIcon onClick={() => handleSetCover(photo)} isCover={isCover}>
        <FaStar size={20} />
      </CoverIcon>
      <DeleteIcon onClick={() => handleDeletePhoto(photo.id)}>
        <MdDelete size={20} />
      </DeleteIcon>
    </PhotoCardContainer>
  );
}
