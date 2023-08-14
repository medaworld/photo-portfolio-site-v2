import { styled } from 'styled-components';

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  /* border: 1px solid red; */

  img {
    object-fit: contain;
    width: 100% !important;
    position: relative !important;
    height: unset !important;
  }
`;
