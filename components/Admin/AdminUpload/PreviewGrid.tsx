import { IoMdCloseCircle } from 'react-icons/io';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import {
  PreviewGridContainer,
  Preview,
  PreviewImage,
  CloseButton,
  ViewButton,
  ImageWrapper,
  Thumbnail,
} from './PreviewGridStyles';
import EditableTitle from './EditableTitle';
import EditableDescription from './EditableTextArea';

export default function PreviewGrid({
  files,
  setFiles,
  toggleSelectedFile,
  removeFile,
  viewFile,
  selectedFiles,
}) {
  const updateFileName = (file, newName) => {
    const updatedFiles = files.map((f) =>
      f === file ? { ...f, title: newName } : f
    );
    setFiles(updatedFiles);
  };

  const updateFileDescription = (file, newDesc) => {
    const updatedFiles = files.map((f) =>
      f === file ? { ...f, description: newDesc } : f
    );
    setFiles(updatedFiles);
  };

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
                src={URL.createObjectURL(file.blob)}
                alt={file.title}
              ></PreviewImage>
              <CloseButton onClick={removeFile(file)} type="button">
                <IoMdCloseCircle />
              </CloseButton>
              <ViewButton onClick={viewFile(file)} type="button">
                <PiMagnifyingGlassBold />
              </ViewButton>
            </Thumbnail>
          </ImageWrapper>
          <EditableTitle file={file} onSave={updateFileName} />
          <EditableDescription file={file} onSave={updateFileDescription} />
        </Preview>
      ))}
    </PreviewGridContainer>
  );
}
