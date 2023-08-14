import { styled } from 'styled-components';
import { size } from '../../../../utils/breakpoints';
import { MdArrowBack } from 'react-icons/md';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import DateInput from '../../../common/DateInput';
import { fetchImages } from '../../../../utils/firebaseUtils';
import PhotoCard from '../../../common/PhotoCard';
import Image from 'next/image';
import StyledButton from '../../../common/StyledButton';

export const AdminNewAlbumContainer = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.backgroundSecondary};
  height: calc(100vh - 110px);
  overflow: scroll;
  padding: 1rem;

  @media (max-width: ${size.mobileL}) {
    /* height: calc(100vh - 170px); */
  }
`;

export const BackLink = styled(Link)`
  align-items: center;
  font-size: 16px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;

export const NewAlbumForm = styled.form`
  margin: 2rem auto;
`;

export const FormInputs = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 1rem auto;
`;

export const InputField = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const TextareaField = styled.textarea`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  resize: none;
  height: 150px;
  font-family: 'Open Sans';
`;

export const PhotosDisplay = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

export const InfinitePhotos = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  height: 200px;
  overflow-y: auto;
`;

export const Photo = styled.div`
  width: 100px;
  height: 100px;
  background-size: cover;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
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
  margin: 1rem auto;
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

export default function AdminNewAlbum({ images }) {
  const [albumPhotos, setAlbumPhotos] = useState([]);
  const [allPhotos, setAllPhotos] = useState(images.images);
  const [cover, setCover] = useState(null);
  const [lastVisible, setLastVisible] = useState(images.lastVisible);
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredDescription, setEnteredDescription] = useState('');
  const [enteredDate, setEnteredDate] = useState('');
  const loadMoreRef = useRef(null);

  const addToAlbum = (photo) => {
    if (!albumPhotos.includes(photo)) {
      setAlbumPhotos([...albumPhotos, photo]);
    }
  };

  useEffect(() => {
    const fetchMoreImages = async () => {
      if (lastVisible) {
        const newImages = await fetchImages({ lastVisible: lastVisible });
        setAllPhotos((prevPhotos) => [
          ...prevPhotos,
          ...(newImages.images || []),
        ]);
        setLastVisible(newImages.lastVisible);
      }
    };

    const currentRef = loadMoreRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreImages();
        }
      },
      { threshold: 1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [lastVisible]);

  function handleDeletePhoto(id) {
    if (cover.id === id) {
      setCover(null);
    }
    setAlbumPhotos((prev) => prev.filter((photo) => photo.id !== id));
  }

  function handleSetCover(photo) {
    setCover(photo);
  }

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

  return (
    <AdminNewAlbumContainer>
      <BackLink href={'/secure/admin/albums'}>
        <MdArrowBack />
        <span>Back to albums</span>
      </BackLink>

      <NewAlbumForm>
        <FormInputs>
          <label>Title</label>
          <InputField
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleInputChange}
          />
          <label>Description</label>
          <TextareaField
            placeholder="Description"
            name="description"
            onChange={handleInputChange}
          />
          <label>Date</label>
          <DateInput setSelectedDate={undefined} />
        </FormInputs>

        <CoverImageContainer>
          <CoverText>
            {enteredTitle && <div className="title">{enteredTitle}</div>}
            {enteredDescription && (
              <div className="description">{enteredDescription}</div>
            )}
            {enteredDate && <div className="date">{enteredDate}</div>}
          </CoverText>
          {cover ? (
            <>
              <Image
                src={cover.url}
                alt={cover.title || 'Image'}
                className={'image'}
                width={400}
                height={400}
              />
            </>
          ) : (
            <span>Select a cover</span>
          )}
        </CoverImageContainer>

        <h4>Photos in Album:</h4>
        <PhotosDisplay>
          {albumPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              handleSetCover={handleSetCover}
              handleDeletePhoto={handleDeletePhoto}
              cover={cover}
            />
          ))}
        </PhotosDisplay>

        <h4>All Photos:</h4>
        <InfinitePhotos>
          {allPhotos.map((photo) => (
            <Photo
              key={photo.id}
              style={{ backgroundImage: `url(${photo.url})` }}
              onClick={() => addToAlbum(photo)}
            />
          ))}
          <div ref={loadMoreRef} />
        </InfinitePhotos>
        <StyledButton variant={'neutral'}>Add Album</StyledButton>
      </NewAlbumForm>
    </AdminNewAlbumContainer>
  );
}
