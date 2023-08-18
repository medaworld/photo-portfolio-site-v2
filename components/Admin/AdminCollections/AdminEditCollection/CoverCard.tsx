import StyledButton from '../../../common/StyledButton';
import Image from 'next/image';
import { Dispatch, useState } from 'react';
import DateInput from '../../../common/DateInput';
import {
  AlbumCard,
  CoverImageContainer,
  CoverText,
  EditableText,
} from './CoverCardStyles';

type CoverCardProps = {
  cover: { id: string; url: string; cover: string };
  type: string;
  enteredTitle: string;
  setEnteredTitle: Dispatch<any>;
  enteredDescription: string;
  setEnteredDescription: Dispatch<any>;
  enteredDate?: Date;
  setEnteredDate?: Dispatch<any>;
};

export default function CoverCard({
  cover,
  type,
  enteredTitle,
  enteredDescription,
  enteredDate,
  setEnteredTitle,
  setEnteredDescription,
  setEnteredDate,
}: CoverCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToogle = (field) => {
    setIsEditing((prev) => !prev);
  };

  const handleDoneEditing = () => {
    setIsEditing(false);
  };

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
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
  }

  return (
    <AlbumCard>
      <CoverImageContainer>
        {cover && (
          <>
            <Image
              src={cover.url || cover.cover}
              alt={cover.id || 'Image'}
              className={'image'}
              width={400}
              height={400}
            />
          </>
        )}
      </CoverImageContainer>

      <CoverText>
        <EditableText className="title">
          {isEditing ? (
            <input
              type="text"
              value={enteredTitle}
              name="title"
              onChange={handleInputChange}
            />
          ) : (
            <span onClick={handleEditToogle}>{enteredTitle}</span>
          )}
        </EditableText>

        <EditableText className="description">
          {isEditing ? (
            <input
              type="text"
              value={enteredDescription}
              name="description"
              onChange={handleInputChange}
            />
          ) : (
            <span onClick={handleEditToogle}>
              {enteredDescription
                ? enteredDescription
                : 'Click here to enter description'}
            </span>
          )}
        </EditableText>

        {type === 'album' && (
          <EditableText className="date">
            {isEditing ? (
              <DateInput setSelectedDate={setEnteredDate} />
            ) : (
              <span onClick={handleEditToogle}>
                {enteredDate
                  ? enteredDate.toLocaleDateString()
                  : 'Click to enter date'}
              </span>
            )}
          </EditableText>
        )}

        {isEditing && (
          <StyledButton
            variant="neutral"
            style={{ position: 'absolute', bottom: '5px' }}
            onClick={handleDoneEditing}
          >
            Done
          </StyledButton>
        )}
      </CoverText>
    </AlbumCard>
  );
}
