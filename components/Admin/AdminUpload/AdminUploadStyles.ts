import { styled } from 'styled-components';

export const AdminUploadContainer = styled.form`
  width: 100%;
`;

export const DragAndDropSection = styled.div`
  padding: 20px;
  width: 100%;
  height: calc(100vh - 165px);
  overflow: scroll;
  color: #fff;
  background-color: #333;
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
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
`;
