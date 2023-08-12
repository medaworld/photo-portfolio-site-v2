import { styled } from 'styled-components';
import { size } from '../../../utils/breakpoints';
import { MdArrowBack } from 'react-icons/md';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import DateInput from '../../common/DateInput';
import { fetchImages } from '../../../utils/firebaseUtils';
import PhotoCard from '../../common/PhotoCard';
import Image from 'next/image';

export const AdminNewAlbumContainer = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.backgroundSecondary};
  height: calc(100vh - 110px);
  overflow: scroll;
  padding: 1rem;

  @media (max-width: ${size.mobileL}) {
    height: calc(100vh - 170px);
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
  max-width: 400px;
`;

export const CoverImageContainer = styled.div`
  margin: 2rem 0;
  background-color: #bababa;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 400px;

  &:hover {
    cursor: pointer;
  }
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
  height: 200px;
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

export default function AdminNewAlbum({ images }) {
  const [albumPhotos, setAlbumPhotos] = useState([]);
  const [allPhotos, setAllPhotos] = useState(images.images);
  const [cover, setCover] = useState(null);
  const [lastVisible, setLastVisible] = useState(images.lastVisible);
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
    setAlbumPhotos((prev) => prev.filter((photo) => photo.id !== id));
  }

  function handleSetCover(photo) {
    setCover(photo);
  }

  return (
    <AdminNewAlbumContainer>
      <BackLink href={'/secure/admin/albums'}>
        <MdArrowBack />
        <span>Back to albums</span>
      </BackLink>

      <NewAlbumForm>
        <FormInputs>
          <InputField placeholder="Title" />
          <TextareaField placeholder="Description" />
          <DateInput />
        </FormInputs>
        <CoverImageContainer>
          {cover && <Image src={cover.url} width={200} height={200} alt={''} />}
          <span>Click to select a cover image</span>
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
          <div ref={loadMoreRef}></div>
        </InfinitePhotos>
        <button>Add Album</button>
      </NewAlbumForm>
    </AdminNewAlbumContainer>
  );
}
