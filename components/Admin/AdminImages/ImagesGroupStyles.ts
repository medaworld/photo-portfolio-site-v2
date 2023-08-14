import { styled } from 'styled-components';

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
