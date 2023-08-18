import { styled } from 'styled-components';

export const PreviewGridContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-auto-rows: 220px;
  justify-content: start;
  align-items: start;
`;

export const Preview = styled.div<{ selected: boolean }>`
  max-width: 160px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;

  &:hover {
    background-color: ${(props) => props.theme.hoverDark};
  }

  &:hover button {
    display: flex;
    padding: 0;
  }

  ${(props) =>
    props.selected &&
    `
    img {
      border: 3px solid #ff50a8;
    }
   
  `}
`;

export const ImageWrapper = styled.div`
  height: 130px;
  margin: 5px;
`;

export const Thumbnail = styled.div`
  display: inline-block;
  height: auto;
  position: relative;
`;

export const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 130px;
  object-fit: contain;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  color: white;
  border: none;
  width: 15px;
  font-size: 15px;
  display: none;
  cursor: pointer;
  transition: all 0.3 ease;

  &:hover {
    opacity: 0.9;
    color: red;
  }
`;

export const ViewButton = styled.button`
  position: absolute;
  left: 0;
  bottom: 5px;
  background-color: #111111bd;
  color: white;
  border: none;
  font-size: 15px;
  display: none;
  cursor: pointer;
  transition: all 0.3 ease;

  &:hover {
    opacity: 0.9;
    background-color: black;
  }
`;
