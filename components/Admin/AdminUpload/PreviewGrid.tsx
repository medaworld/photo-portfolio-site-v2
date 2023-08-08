import { styled } from 'styled-components';
import { CloseIcon } from '../../common/CloseIcon';

export const PreviewGridContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-auto-rows: 220px;
  justify-content: start;
  align-items: start;
`;

export const Preview = styled.div<{ selected }>`
  max-width: 150px;
  height: 220px;
  position: relative;
  overflow: hidden;
  text-align: center;

  &:hover {
    background-color: black;
  }

  &:hover button {
    display: block;
  }

  ${(props) =>
    props.selected &&
    `
    img {
      border: 3px solid #ff50a8;
    }
   
  `}
`;

export const PreviewImage = styled.img`
  max-width: 150px;
  max-height: 128px;
  margin-top: 15px;
  object-fit: contain;
`;

export const FileName = styled.span`
  display: block;
  font-size: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 90%;
  margin: 5px auto 0;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${(props) => props.theme.dark};
  border: 1px solid ${(props) => props.theme.darker};
  font-size: 16px;
  display: none;
  cursor: pointer;
  transition: all 0.3 ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const ViewButton = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  background: none;
  border: none;
  font-size: 16px;
  display: none;
  cursor: pointer;
  transition: all 0.3 ease;

  &:hover {
    opacity: 0.9;
  }
`;

export default function PreviewGrid({
  files,
  toggleSelectedFile,
  removeFile,
  viewFile,
  selectedFiles,
}) {
  return (
    <PreviewGridContainer>
      {files.map((file) => (
        <Preview
          key={file.path}
          onClick={() => toggleSelectedFile(file)}
          selected={selectedFiles.includes(file)}
        >
          <PreviewImage
            src={URL.createObjectURL(file)}
            alt={file.name}
          ></PreviewImage>
          <CloseButton onClick={removeFile(file)} type="button">
            <CloseIcon color={'white'} />
          </CloseButton>
          <ViewButton onClick={viewFile(file)} type="button">
            🔍
          </ViewButton>
          <FileName>{file.name}</FileName>
        </Preview>
      ))}
    </PreviewGridContainer>
  );
}
