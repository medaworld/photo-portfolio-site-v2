import { useContext, useState } from 'react';
import { NotificationContext } from '../../../context/notification/NotificationContext';
import StyledButton from '../../common/StyledButton';
import {
  EditPhotosContainer,
  Title,
  EditForm,
  DateContainer,
  DateLabel,
  ButtonContainer,
} from './EditPhotosFormStyles';
import StyledInput from '../../common/StyledInput';
import StyledTextArea from '../../common/StyledTextArea';
import DateInput from '../../common/DateInput';
import { ImageDataProps } from '../../../types/firebase';
import { updateImages } from '../../../utils/firebaseUtils';

export default function EditPhotos({
  selectedImages,
  clearSelectedImages,
  refreshImages,
  closeModal,
}) {
  const notificationCtx = useContext(NotificationContext);
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredDescription, setEnteredDescription] = useState('');
  const [dateTaken, setDateTaken] = useState('');
  const [uploadedAt, setUploadedAt] = useState('');

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title':
        setEnteredTitle(value);
        break;
      case 'description':
        setEnteredDescription(value);
        break;
      default:
        break;
    }
  };

  let imageData: ImageDataProps = {};

  if (enteredTitle) {
    imageData.title = enteredTitle;
  }

  if (enteredDescription) {
    imageData.description = enteredDescription;
  }

  if (dateTaken) {
    imageData.dateTaken = new Date(dateTaken);
  }

  if (uploadedAt) {
    imageData.uploadedAt = new Date(uploadedAt);
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    if (Object.keys(imageData).length === 0) {
      alert('No changes were made!');
      return;
    }
    notificationCtx.showNotification({
      title: 'Updating...',
      message: 'Please wait. Updating files',
      status: 'Pending',
    });
    try {
      await updateImages(selectedImages, imageData);
      notificationCtx.showNotification({
        title: 'Success',
        message: 'Images updated successfully',
        status: 'success',
      });
      clearSelectedImages();
      await refreshImages();
      closeModal();
    } catch (error) {
      console.error('Error updating image data: ', error);
      notificationCtx.showNotification({
        title: 'Error',
        message:
          'An error occurred while updating the images. Please try again.',
        status: 'error',
      });
    }
  }

  return (
    <EditPhotosContainer>
      <Title>Editing</Title>
      <EditForm onSubmit={handleSubmit}>
        <StyledInput
          variant="primary"
          type="text"
          name="title"
          placeholder="Change title"
          value={enteredTitle || ''}
          onChange={handleInputChange}
        />
        <StyledTextArea
          variant="primary"
          name="description"
          placeholder="Change description"
          value={enteredDescription || ''}
          onChange={handleInputChange}
        />

        <DateContainer>
          <DateLabel>Date Taken: </DateLabel>
          <DateInput setSelectedDate={setDateTaken} />
        </DateContainer>

        <DateContainer>
          <DateLabel>Uploaded At: </DateLabel>
          <DateInput setSelectedDate={setUploadedAt} />
        </DateContainer>

        <ButtonContainer>
          <StyledButton
            variant="neutral"
            type="button"
            onClick={() => {
              closeModal();
            }}
          >
            Cancel
          </StyledButton>
          <StyledButton variant="primary" type="submit">
            Submit
          </StyledButton>
        </ButtonContainer>
      </EditForm>
    </EditPhotosContainer>
  );
}
