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

export const ImageGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const ImageWrapper = styled.div<{ isSelected }>`
  width: 150px;
  padding: 5px;
  transition: opacity 0.3s ease;
  cursor: pointer;

  img {
    outline: ${({ isSelected }) => (isSelected ? '3px solid #ff0000' : 'none')};
  }
  &:hover {
    opacity: 0.8;
  }
`;

export const BottomPanel = styled.div`
  position: sticky;
  bottom: 0;
  background-color: ${(props) => props.theme.tplight};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TopActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const BottomActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

export const ImagePreview = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 5px;
  margin-right: 8px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
