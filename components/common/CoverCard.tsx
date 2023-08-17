import { styled } from 'styled-components';
import StyledButton from './StyledButton';
import Image from 'next/image';
import { Dispatch, useState } from 'react';
import DateInput from './DateInput';

export const AlbumCard = styled.div`
  width: 100%;
  margin: 1rem auto;
  position: relative;
`;

export const CoverImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  min-height: 300px;

  > div {
    position: unset !important;
  }

  .image {
    object-fit: cover;
    width: 100% !important;
    position: relative !important;
    height: 30vw !important;
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
  overflow: hidden;

  .title {
    font-size: 2rem;

    input {
      font-size: 2rem;
    }
  }
`;

export const EditableText = styled.div`
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px;
  cursor: pointer;
  z-index: 1;
  font-family: 'Raleway';
  font-weight: 100;
  font-size: 16px;

  input {
    border: none;
    text-align: center;
    font-family: 'Raleway';
    font-weight: 100;
    background-color: transparent;
    color: white;
    padding: 0;
    font-size: 16px;
    outline: none;
  }
`;

export const DoneButton = styled.button`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`;

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
  setEnteredTitle,
  enteredDescription,
  setEnteredDescription,
  enteredDate,
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
