import { styled } from 'styled-components';
import { size } from '../../../../utils/breakpoints';
import Link from 'next/link';

export const AdminAlbumsLibraryContainer = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.backgroundSecondary};
  height: calc(100vh - 110px);
  overflow: scroll;
  padding: 1rem;

  @media (max-width: ${size.mobileL}) {
    height: calc(100vh - 170px);
  }
`;

export const AlbumCard = styled.div`
  width: 100%;
  margin: 2rem auto;
  position: relative;
`;

export const CoverImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  min-height: 300px;

  > div {
    position: unset !important;
  }

  .image {
    object-fit: cover;
    width: 100% !important;
    position: relative !important;
    height: 30vw !important;
    min-height: 300px;
  }
`;

export const CoverText = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 1rem 0;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  font-family: 'Raleway';
  overflow: hidden;

  .title {
    font-size: 2rem;

    input {
      font-size: 2rem;
    }
  }
`;

export const EditableText = styled.div`
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px;
  cursor: pointer;
  z-index: 1;
  font-family: 'Raleway';
  font-weight: 100;
  font-size: 16px;

  input {
    border: none;
    text-align: center;
    font-family: 'Raleway';
    font-weight: 100;
    background-color: transparent;
    color: white;
    padding: 0;
    font-size: 16px;
    outline: none;
  }
`;

export const DoneButton = styled.button`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`;

export const PhotosGrid = styled.div`
  display: flex;
  overflow-x: scroll;
  padding-bottom: 5px;
  gap: 1rem;
  justify-content: start;
  align-items: center;
  white-space: nowrap;
`;

export const PhotoCardContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  flex: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CoverIcon = styled.div`
  position: absolute;
  bottom: 5px;
  left: 5px;
  cursor: pointer;
  color: ${(props) => props.theme.background};
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

export const Buttons = styled.div`
  display: flex;
  margin: 1rem 0;
  gap: 1rem;

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-family: 'Open sans';
    cursor: pointer;
    transition: all 0.3s ease;
  }
`;

export const AddButton = styled.button`
  background-color: ${(props) => props.theme.color};
  color: ${(props) => props.theme.background};

  &:hover {
    opacity: 0.9;
  }
`;

export const DeleteButton = styled.button`
  background-color: ${(props) => props.theme.error};
  color: ${(props) => props.theme.background};

  &:hover {
    opacity: 0.9;
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

export const BackLink = styled(Link)`
  align-items: center;
  font-size: 16px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;
