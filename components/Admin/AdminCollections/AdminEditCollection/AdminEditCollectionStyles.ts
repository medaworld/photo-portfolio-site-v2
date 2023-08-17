import { styled } from 'styled-components';
import { size } from '../../../../utils/breakpoints';

export const AdminEditCollectionsContainer = styled.div`
  width: 100%;
  height: calc(100vh - 110px);
  overflow: scroll;
  padding: 1rem;

  @media (max-width: ${size.mobileL}) {
    height: calc(100vh - 170px);
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
