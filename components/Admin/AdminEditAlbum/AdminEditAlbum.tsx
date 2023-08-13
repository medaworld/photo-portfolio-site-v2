import { useState } from 'react';
import { MdArrowBack, MdDelete } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import Image from 'next/image';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
} from './AdminEditAlbumStyles';
import StyledButton from '../../common/StyledButton';

export default function AdminEditAlbum({ albumData }) {
  const [album, setAlbum] = useState(albumData);
  const [photos, setPhotos] = useState(albumData.photos);
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
  };

  console.log(photos);

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

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedPhotos = Array.from(photos);
    const [removed] = reorderedPhotos.splice(result.source.index, 1);
    reorderedPhotos.splice(result.destination.index, 0, removed);

    setPhotos(reorderedPhotos);
  };

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

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="photosGrid" direction="horizontal">
          {(provided) => (
            <PhotosGrid ref={provided.innerRef} {...provided.droppableProps}>
              {photos.map((photo, index) => (
                <Draggable key={photo.id} draggableId={photo.id} index={index}>
                  {(provided) => (
                    <PhotoCard
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ImageContainer>
                        <Image
                          src={photo.url}
                          alt={photo.title || 'Image'}
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
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </PhotosGrid>
          )}
        </Droppable>
      </DragDropContext>

      <Buttons>
        <StyledButton variant="neutral" onClick={handleAddMoreImages}>
          Add more images
        </StyledButton>
        <StyledButton variant="error" onClick={handleDeleteAlbum}>
          Delete album
        </StyledButton>
      </Buttons>
    </AdminAlbumsLibraryContainer>
  );
}
