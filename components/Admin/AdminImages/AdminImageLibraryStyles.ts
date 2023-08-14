import { styled } from 'styled-components';
import { size } from '../../../utils/breakpoints';

export const AdminImageLibraryContainer = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.background};
  padding-bottom: 0;
  height: calc(100vh - 110px);
  overflow: scroll;

  @media (max-width: ${size.mobileL}) {
    height: calc(100vh - 170px);
  }
`;

export const AdminImageLibraryInner = styled.div`
  margin: 1rem;
`;
