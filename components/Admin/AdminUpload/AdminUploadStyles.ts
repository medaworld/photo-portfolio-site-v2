import { styled } from 'styled-components';
import { size } from '../../../utils/breakpoints';

export const AdminUploadContainer = styled.form`
  width: 100%;
  background-color: #333;
`;

export const AdminUploadInner = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: calc(100vh - 110px);

  @media (max-width: ${size.mobileL}) {
    height: calc(100vh - 170px);
  }
`;

export const DragAndDropSection = styled.div`
  padding: 20px;
  width: 100%;
  height: calc(150%);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UploadSection = styled.div`
  text-align: center;
`;

export const ImageContainer = styled.div`
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;

  img {
    display: flex;
    object-fit: contain;
    max-width: 70vw;
    max-height: 70vh;
    width: auto;
    height: auto;
  }
`;
