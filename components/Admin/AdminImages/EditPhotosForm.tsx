import { useContext, useState } from 'react';
import { firestore } from '../../../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { NotificationContext } from '../../../context/notification/NotificationContext';
import { months } from '../../../utils/dateUtils';
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
  const [selectedTakenMonth, setSelectedTakenMonth] = useState('');
  const [selectedTakenYear, setSelectedTakenYear] = useState('');
  const [selectedTakenDay, setSelectedTakenDay] = useState('');
  const [selectedUploadedMonth, setSelectedUploadedMonth] = useState('');
  const [selectedUploadedYear, setSelectedUploadedYear] = useState('');
  const [selectedUploadedDay, setSelectedUploadedDay] = useState('');

  function MonthOptions() {
    return months.map((month, index) => (
      <option key={index} value={index + 1}>
        {month}
      </option>
    ));
  }

  function YearOptions({
    startYear = new Date().getFullYear(),
    endYear = 1900,
  }) {
    const years = [];
    for (let year = startYear; year >= endYear; year--) {
      years.push(year);
    }

    return years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ));
  }

  function DayOptions({ month, year }) {
    const daysInMonth = new Date(year, month, 0).getDate();
    const days = [];
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days.map((day) => (
      <option key={day} value={day}>
        {day}
      </option>
    ));
  }

  const handleMonthChange = (event: any) => {
    const type = event.target.getAttribute('data-type');
    const value = event.target.value;

    if (type === 'taken') {
      setSelectedTakenMonth(value);
    } else if (type === 'uploaded') {
      setSelectedUploadedMonth(value);
    }
  };

  const handleYearChange = (event: any) => {
    const type = event.target.getAttribute('data-type');
    const value = event.target.value;

    if (type === 'taken') {
      setSelectedTakenYear(value);
    } else if (type === 'uploaded') {
      setSelectedUploadedYear(value);
    }
  };

  const handleDayChange = (event: any) => {
    const type = event.target.getAttribute('data-type');
    const value = event.target.value;

    if (type === 'taken') {
      setSelectedTakenDay(value);
    } else if (type === 'uploaded') {
      setSelectedUploadedDay(value);
    }
  };

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

  type imageData = {
    title?: string;
    description?: string;
    dateTaken?: Date;
    uploadedAt?: Date;
  };

  let imageData: imageData = {};

  if (enteredTitle) {
    imageData.title = enteredTitle;
  }

  if (enteredDescription) {
    imageData.description = enteredDescription;
  }

  if (selectedTakenYear && selectedTakenMonth && selectedTakenDay) {
    imageData.dateTaken = new Date(
      `${selectedTakenYear}-${selectedTakenMonth}-${selectedTakenDay}`
    );
  }

  if (selectedUploadedYear && selectedUploadedMonth && selectedUploadedDay) {
    imageData.uploadedAt = new Date(
      `${selectedUploadedYear}-${selectedUploadedMonth}-${selectedUploadedDay}`
    );
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
      for (let imageId of selectedImages) {
        const imageRef = doc(firestore, 'images', imageId);
        await updateDoc(imageRef, imageData);
      }
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
  console.log(dateTaken);

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
          {/* <select
            name="year"
            data-type="taken"
            value={selectedTakenYear}
            onChange={handleYearChange}
            placeholder="Please select year"
          >
            <option value="" disabled hidden>
              Year
            </option>
            <YearOptions />
          </select>
          <select
            name="month"
            data-type="taken"
            value={selectedTakenMonth}
            onChange={handleMonthChange}
          >
            <option value="" disabled hidden>
              Month
            </option>
            <MonthOptions />
          </select>
          <select
            name="day"
            data-type="taken"
            value={selectedTakenDay}
            onChange={handleDayChange}
          >
            <option value="" disabled hidden>
              Day
            </option>
            <DayOptions month={selectedTakenMonth} year={selectedTakenYear} />
          </select> */}
        </DateContainer>

        <DateContainer>
          <DateLabel>Uploaded At: </DateLabel>
          <select
            name="year"
            data-type="uploaded"
            value={selectedUploadedYear}
            onChange={handleYearChange}
          >
            <option value="" disabled hidden>
              Year
            </option>
            <YearOptions />
          </select>
          <select
            name="month"
            data-type="uploaded"
            value={selectedUploadedMonth}
            onChange={handleMonthChange}
          >
            <option value="" disabled hidden>
              Month
            </option>
            <MonthOptions />
          </select>
          <select
            name="day"
            data-type="uploaded"
            value={selectedUploadedDay}
            onChange={handleDayChange}
          >
            <option value="" disabled hidden>
              Day
            </option>
            <DayOptions
              month={selectedUploadedMonth}
              year={selectedUploadedYear}
            />
          </select>
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
