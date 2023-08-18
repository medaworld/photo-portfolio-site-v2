import { styled } from 'styled-components';

export const AlbumCard = styled.div`
  width: 100%;
  margin: 1rem auto;
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
