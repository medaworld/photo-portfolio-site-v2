import { styled } from 'styled-components';

export const AdminUploadContainer = styled.div`
  width: 100%;
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

export const Sidebar = styled.aside`
  width: 200px;
  border: 1px solid #ccc;
  padding: 20px;
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
