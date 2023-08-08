import { styled } from 'styled-components';

export const UploadNavbarContainer = styled.div`
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

export default function UploadNavbar({ onAddClick, onRemoveClick }) {
  return (
    <UploadNavbarContainer>
      <div>
        <UploadNavButton onClick={onAddClick} type="button">
          Add
        </UploadNavButton>
        <UploadNavButton onClick={onRemoveClick} type="button">
          Remove
        </UploadNavButton>
      </div>
      <UploadButton type="submit">Upload</UploadButton>
    </UploadNavbarContainer>
  );
}
