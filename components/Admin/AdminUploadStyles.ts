import { styled } from 'styled-components';

export const DragAndDropSection = styled.div`
  padding: 20px;
  width: 100%;
  color: #bbb;
  background-color: ${(props) => props.theme.dark};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UploadSection = styled.div`
  text-align: center;
`;

export const PreviewGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 220px;
  justify-content: start;
  align-items: start;
`;

export const Preview = styled.div<{ selected }>`
  width: 200px;
  height: 220px;
  position: relative;
  overflow: hidden;
  text-align: center;

  &:hover {
    background-color: black;
  }

  &:hover button {
    display: block;
  }

  ${(props) =>
    props.selected &&
    `
    border-color: blue;
    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 255, 0.3); 
    }
  `}
`;

export const PreviewImage = styled.img`
  max-width: 174px;
  max-height: 128px;
  margin-top: 15px;
  object-fit: contain;
`;

export const FileName = styled.span`
  display: block;
  font-size: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 90%;
  margin: 5px auto 0;
`;

export const Sidebar = styled.aside`
  width: 200px;
  border: 1px solid #ccc;
  padding: 20px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${(props) => props.theme.dark};
  border: 1px solid ${(props) => props.theme.darker};
  font-size: 16px;
  display: none;
  cursor: pointer;
  transition: all 0.3 ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const ViewButton = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  background: none;
  border: none;
  font-size: 16px;
  display: none;
  cursor: pointer;
  transition: all 0.3 ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => props.theme.color};
  color: ${(props) => props.theme.background};
  border: none;
  border-radius: 5px;
  font-family: 'Open sans';
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;
