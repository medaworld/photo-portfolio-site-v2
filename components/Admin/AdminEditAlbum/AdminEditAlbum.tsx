import { useState } from 'react';
import { MdArrowBack, MdDelete } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import Image from 'next/image';
import {
  AdminAlbumsLibraryContainer,
  AlbumCard,
  CoverIcon,
  DeleteIcon,
  DoneButton,
  EditableText,
  PhotoCard,
  PhotosGrid,
  ImageContainer,
  BackLink,
  CoverImageContainer,
  Buttons,
  AddButton,
  DeleteButton,
} from './AdminEditAlbumStyles';

export default function AdminEditAlbum({ albumData }) {
  const [album, setAlbum] = useState(albumData);
  const [isEditing, setIsEditing] = useState(false);
  const [enteredTitle, setEnteredTitle] = useState(album.title || '');
  const [enteredDescription, setEnteredDescription] = useState(
    album.description || ''
  );
  const [enteredDate, setEnteredDate] = useState(album.date || '');

  const handleEditToogle = (field) => {
    setIsEditing((prev) => !prev);
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    // setIsEditingDescription(false);
    // setIsEditingDate(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title':
        setEnteredTitle(value);
        break;
      case 'description':
        setEnteredDescription(value);
        break;
      case 'date':
        setEnteredDate(value);
        break;
      default:
        break;
    }
  };

  const handleSetCover = (photoId) => {};

  const handleDeletePhoto = (photoId) => {};

  const handleAddMoreImages = () => {};

  const handleDeleteAlbum = () => {};

  return (
    <AdminAlbumsLibraryContainer>
      <BackLink href={'/secure/admin/albums'}>
        <MdArrowBack />
        <span>Back to albums</span>
      </BackLink>

      <AlbumCard>
        <CoverImageContainer>
          <Image
            src={album.cover.url}
            alt={album.title || 'Image'}
            className={'image'}
            width={400}
            height={400}
          />
        </CoverImageContainer>

        <EditableText className="title">
          {isEditing ? (
            <input
              type="text"
              value={enteredTitle}
              name="title"
              onChange={handleInputChange}
            />
          ) : (
            <span onClick={handleEditToogle}>{album.title}</span>
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
              {album.description
                ? album.description
                : 'Click here to enter description'}
            </span>
          )}
        </EditableText>

        <EditableText className="date">
          {isEditing ? (
            <input
              type="date"
              value={enteredDate}
              name="date"
              onChange={handleInputChange}
            />
          ) : (
            <span onClick={handleEditToogle}>
              {album.date ? album.date : 'Click to enter date'}
            </span>
          )}
        </EditableText>

        {isEditing && <DoneButton onClick={handleSaveChanges}>Done</DoneButton>}
      </AlbumCard>

      <PhotosGrid>
        {album.photos.map((photo, index) => (
          <PhotoCard key={photo.id}>
            <ImageContainer>
              <Image
                src={photo.url}
                alt={album.title || 'Image'}
                className={'image'}
                width={400}
                height={400}
              />
            </ImageContainer>
            <CoverIcon onClick={() => handleSetCover(photo.id)}>
              <FaStar size={20} />
            </CoverIcon>
            <DeleteIcon onClick={() => handleDeletePhoto(photo.id)}>
              <MdDelete size={20} />
            </DeleteIcon>
          </PhotoCard>
        ))}
      </PhotosGrid>
      <Buttons>
        <AddButton onClick={handleAddMoreImages}>Add more images</AddButton>
        <DeleteButton onClick={handleDeleteAlbum}>Delete album</DeleteButton>
      </Buttons>
    </AdminAlbumsLibraryContainer>
  );
}
