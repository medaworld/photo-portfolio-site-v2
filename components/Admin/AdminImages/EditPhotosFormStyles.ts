import { styled } from 'styled-components';

export const EditPhotosContainer = styled.div`
  padding-top: 30px;
`;

export const Title = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 1rem;
`;

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const DateContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;

  select option {
    max-height: 30px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-top: 1rem;
`;

export const DateLabel = styled.span`
  margin-right: 10px;
  font-size: 14px;
`;
