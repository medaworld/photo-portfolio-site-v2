import { IoMdCloseCircle } from 'react-icons/io';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import {
  PreviewGridContainer,
  Preview,
  PreviewImage,
  CloseButton,
  ViewButton,
  FileName,
  ImageWrapper,
  Thumbnail,
} from './PreviewGridStyles';

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
          <ImageWrapper>
            <Thumbnail>
              <PreviewImage
                src={URL.createObjectURL(file)}
                alt={file.name}
              ></PreviewImage>
              <CloseButton onClick={removeFile(file)} type="button">
                <IoMdCloseCircle />
              </CloseButton>
              <ViewButton onClick={viewFile(file)} type="button">
                <PiMagnifyingGlassBold />
              </ViewButton>
            </Thumbnail>
          </ImageWrapper>
          <FileName>{file.name}</FileName>
        </Preview>
      ))}
    </PreviewGridContainer>
  );
}
