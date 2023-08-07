import { styled } from 'styled-components';

export const ImageContainer = styled.div`
  width: 100%;

  img {
    object-fit: contain;
    width: 100% !important;
    position: relative !important;
    height: unset !important;
  }
`;
