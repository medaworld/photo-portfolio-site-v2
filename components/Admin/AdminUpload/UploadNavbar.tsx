import { styled } from 'styled-components';
import { FaPlus, FaMinus } from 'react-icons/fa';
import StyledButton from '../../common/StyledButton';

export const UploadNavbarContainer = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.secondary};
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;

  button {
    padding: 5px;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export default function UploadNavbar({ onAddClick, onRemoveClick }) {
  return (
    <UploadNavbarContainer>
      <ButtonsWrapper>
        <StyledButton variant="neutral" onClick={onAddClick} type="button">
          <FaPlus /> Add
        </StyledButton>
        <StyledButton variant="neutral" onClick={onRemoveClick} type="button">
          <FaMinus /> Remove
        </StyledButton>
      </ButtonsWrapper>
      <StyledButton variant="primary" type="submit">
        Upload
      </StyledButton>
    </UploadNavbarContainer>
  );
}
