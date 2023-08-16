import { styled } from 'styled-components';

export const AdminNewAlbumContainer = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.background};
  height: calc(100vh - 110px);
  overflow: scroll;
  padding: 1rem;
`;

export const NewCollectionForm = styled.form`
  margin: 2rem auto;
`;

export const FormInputs = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;

  input {
    margin-bottom: 1rem;
  }

  textarea {
    margin-bottom: 1rem;
  }
`;

export const CoverImageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #bfbfbf;
  height: 30vw !important;
  min-height: 300px;
  max-height: 500px;
  max-width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 1rem 0;
  position: relative;

  .image {
    object-fit: cover;
    width: 100% !important;
    position: relative !important;
    height: 100% !important;
    min-height: 300px;
  }
`;

export const CoverText = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 1rem 0;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  font-family: 'Raleway';

  .title {
    font-size: 2rem;
  }
`;
