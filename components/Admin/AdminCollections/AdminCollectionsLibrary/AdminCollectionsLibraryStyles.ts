import { styled } from 'styled-components';
import { size } from '../../../../utils/breakpoints';

export const AdminCollectionsLibraryContainer = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.backgroundSecondary};
  padding: 1rem;
  height: calc(100vh - 110px);
  overflow: scroll;

  @media (max-width: ${size.mobileL}) {
    height: calc(100vh - 170px);
  }
`;

export const Collections = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  gap: 1rem;
  width: 100%;
  justify-content: center;

  @media (max-width: ${size.mobileL}) {
    grid-template-columns: repeat(auto-fit, 150px);
  }
`;

export const CollectionCard = styled.div`
  width: 200px;
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: ${size.mobileL}) {
    width: 150px;
    height: 150px;
  }
`;

export const CollectionCardInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  color: white;
  padding: 10px;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
`;

export const CollectionText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AddCollectionButton = styled.button`
  background-color: ${(props) => props.theme.primaryButton};
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
