import { styled } from 'styled-components';

export const BottomPanelContainer = styled.div`
  position: sticky;
  bottom: 0;
  background-color: ${(props) => props.theme.tpBackground};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-top: 1px solid ${(props) => props.theme.lightBorder};
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
