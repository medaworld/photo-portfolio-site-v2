import { styled } from 'styled-components';

export const AdminUploadContainer = styled.div`
  width: 100%;
`;

export const UploadNavBar = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.light};
  height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;

  button {
    font-size: 14px;
    outline: none;
    border: none;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export const UploadNavButton = styled.button`
  background-color: transparent;
  transition: background-color 0.3s ease;
  margin-right: 10px;

  &:hover {
    outline: none;
    background-color: #cfcfcf;
  }
`;

export const UploadButton = styled.button`
  background-color: #5395ff;
  color: white;

  transition: background-color 0.3s ease;

  &:hover {
    outline: none;

    background-color: #3f72c2;
  }
`;

export const DragAndDropSection = styled.div`
  padding: 20px;
  width: 100%;
  height: calc(100% - 2rem);
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
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-auto-rows: 220px;
  justify-content: start;
  align-items: start;
`;

export const Preview = styled.div<{ selected }>`
  max-width: 150px;
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
    img {
      border: 3px solid #ff50a8;
    }
   
  `}
`;

export const PreviewImage = styled.img`
  max-width: 150px;
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
