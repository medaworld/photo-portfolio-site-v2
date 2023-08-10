import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

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

export const ButtonsWrapper = styled.div`
  display: flex;
`;

export const UploadNavButton = styled.button`
  color: ${(props) => props.theme.primary};
  transition: background-color 0.3s ease;
  font-size: 1rem;
  margin-right: 10px;
  display: flex;

  svg {
    margin-right: 3px;
  }

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
      <ButtonsWrapper>
        <UploadNavButton onClick={onAddClick} type="button">
          <FontAwesomeIcon icon={faPlus} /> Add
        </UploadNavButton>
        <UploadNavButton onClick={onRemoveClick} type="button">
          <FontAwesomeIcon icon={faMinus} /> Remove
        </UploadNavButton>
      </ButtonsWrapper>
      <UploadButton type="submit">Upload</UploadButton>
    </UploadNavbarContainer>
  );
}
