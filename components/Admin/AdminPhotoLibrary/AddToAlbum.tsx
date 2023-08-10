import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { firestore } from '../../../lib/firebase';
import {
  Timestamp,
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { FaCheckCircle } from 'react-icons/fa';

const AddToAlbumContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  width: 100%;
`;

const Title = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 1rem;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
`;

const AlbumList = styled.div`
  height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-width: 425px;

  @media (max-width: 572px) {
    min-width: 175px;
  }
`;

const AlbumItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
    color: #333;
  }
`;

const AlbumInfo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  margin-right: 10px;
  max-width: calc(100% - 20px);
  overflow: hidden;
`;

const AlbumCover = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  object-fit: cover;
`;

const AlbumDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;

  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 100%;
  }
`;

const AlbumMsg = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NewAlbumPanel = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  input {
    height: 25px;
    margin-bottom: 15px;
  }
  textarea {
    resize: none;
    height: 80px;
  }
`;

const Button = styled.button`
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
`;

const AlbumCheck = styled.span`
  margin-right: 5px;
`;
const CheckMarkIcon = styled(FaCheckCircle)`
  color: #00b7ff;
  font-size: 16px;
`;

export default function AddToAlbum({ selectedImages, closeModal }) {
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewAlbumPanel, setShowNewAlbumPanel] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState('');
  const [newAlbumDescription, setNewAlbumDescription] = useState('');
  const [loading, setLoading] = useState(false);

  async function fetchAlbums() {
    setLoading(true);
    const albumsRef = collection(firestore, 'albums');

    const snapshot = await getDocs(albumsRef);

    const fetchImageUrl = async (imageId) => {
      const imageRef = doc(firestore, 'images', imageId);
      const imageSnapshot = await getDoc(imageRef);
      if (imageSnapshot.exists()) {
        return imageSnapshot.data().url;
      }
      return null;
    };

    const albums = await Promise.all(
      snapshot.docs.map(async (docSnapshot) => {
        const docData = docSnapshot.data();

        const coverImageUrl = await fetchImageUrl(docData.cover);

        return {
          id: docData.id,
          cover: coverImageUrl,
          title: docData.title,
          photos: docData.photos,
          count: docData.photos ? docData.photos.length : 0,
        };
      })
    );

    setLoading(false);
    return albums;
  }

  async function handleAddImagesToAlbum(albumId: string) {
    const albumRef = doc(firestore, 'albums', albumId);

    const albumSnapshot = await getDoc(albumRef);
    const albumData = albumSnapshot.data();
    const currentPhotos = albumData.photos || [];

    const imagesToAdd = selectedImages.filter(
      (img) => !currentPhotos.includes(img)
    );

    const imagesToRemove = selectedImages.filter((img) =>
      currentPhotos.includes(img)
    );

    if (imagesToAdd.length > 0) {
      await updateDoc(albumRef, {
        photos: arrayUnion(...imagesToAdd),
      });
    }

    if (imagesToRemove.length > 0 && imagesToAdd.length === 0) {
      await updateDoc(albumRef, {
        photos: arrayRemove(...imagesToRemove),
      });
    }

    const updatedAlbums = await fetchAlbums();
    setAlbums(updatedAlbums);
  }

  async function createNewAlbum() {
    const newAlbum = {
      title: newAlbumName,
      description: newAlbumDescription,
      photos: selectedImages,
      cover: selectedImages[0] || null,
      createdAt: Timestamp.now(),
    };

    const albumsRef = collection(firestore, 'albums');
    const docRef = await addDoc(albumsRef, newAlbum);

    await updateDoc(docRef, {
      id: docRef.id,
    });

    const fetchImageUrl = async (imageId) => {
      if (!imageId) return null;
      const imageRef = doc(firestore, 'images', imageId);
      const imageData = await getDoc(imageRef);
      return imageData.exists() ? imageData.data().url : null;
    };

    const coverUrl = await fetchImageUrl(newAlbum.cover);

    setAlbums([
      {
        ...newAlbum,
        id: docRef.id,
        cover: coverUrl,
        count: selectedImages.length,
      },
      ...albums,
    ]);
    setShowNewAlbumPanel(false);
    setNewAlbumName('');
    setNewAlbumDescription('');
  }

  useEffect(() => {
    const fetchAndSetAlbums = async () => {
      try {
        const fetchedAlbums = await fetchAlbums();
        setAlbums(fetchedAlbums);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAndSetAlbums();
  }, []);

  const filteredAlbums = albums.filter((album) =>
    album.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AddToAlbumContainer>
      <Title>Albums</Title>
      <SearchBar
        placeholder="Search for an album..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <AlbumList>
        {filteredAlbums.map((album) => (
          <AlbumItem
            key={album.id}
            onClick={() => handleAddImagesToAlbum(album.id)}
          >
            <AlbumInfo>
              <AlbumCover src={album.cover} alt={album.title} />
              <AlbumDetails>
                <span>{album.title}</span>
                <small>{album.count} items</small>
              </AlbumDetails>
            </AlbumInfo>
            <AlbumCheck>
              {selectedImages?.every((imgId) =>
                album.photos?.includes(imgId)
              ) && <CheckMarkIcon />}
            </AlbumCheck>
          </AlbumItem>
        ))}
        {filteredAlbums.length === 0 && (
          <AlbumMsg>{loading ? 'Loading...' : 'No albums'}</AlbumMsg>
        )}
      </AlbumList>
      {showNewAlbumPanel && (
        <NewAlbumPanel>
          <input
            placeholder="Album title"
            value={newAlbumName}
            onChange={(e) => setNewAlbumName(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={newAlbumDescription}
            onChange={(e) => setNewAlbumDescription(e.target.value)}
          />
          <div>
            <Button onClick={() => setShowNewAlbumPanel(false)}>Cancel</Button>
            <Button onClick={createNewAlbum}>Create</Button>
          </div>
        </NewAlbumPanel>
      )}
      <div>
        {!showNewAlbumPanel && (
          <Button onClick={() => setShowNewAlbumPanel(!showNewAlbumPanel)}>
            + Create New Album
          </Button>
        )}
        <Button style={{ float: 'right' }} onClick={closeModal}>
          Done
        </Button>
      </div>
    </AddToAlbumContainer>
  );
}
