import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { firestore } from '../../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FaCheck } from 'react-icons/fa';

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
    opacity: 0.9;
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

const AlbumCheck = styled.span`
  width: 10px;
  height: 10px;
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
`;

const CheckMarkIcon = styled(FaCheck)`
  color: green;
  font-size: 20px;
  margin-left: 10px;
`;

const mockAlbums = [
  {
    id: 1,
    cover: 'path_to_image',
    name: 'Album 1',
    count: 5,
    isSelected: false,
  },
  {
    id: 2,
    cover: 'path_to_image',
    name: 'Album 2',
    count: 3,
    isSelected: true,
  },
];

export default function AddToAlbum({ selectedImages, closeModal }) {
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewAlbumPanel, setShowNewAlbumPanel] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState('');
  const [newAlbumDescription, setNewAlbumDescription] = useState('');

  console.log(selectedImages);
  async function fetchAlbums() {
    const albumsRef = collection(firestore, 'albums');

    const snapshot = await getDocs(albumsRef);

    const albums = snapshot.docs.map((docSnapshot) => {
      const docData = docSnapshot.data();

      return {
        cover: docData.coverImg,
        name: docData.title,
        count: docData.images ? docData.images.length : 0,
      };
    });

    return albums;
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
    album.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(filteredAlbums);

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
          <AlbumItem key={album.id}>
            <AlbumInfo>
              <AlbumCover src={album.cover} alt={album.name} />
              <AlbumDetails>
                <span>{album.name}</span>
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
        {filteredAlbums.length === 0 && <AlbumMsg>No albums</AlbumMsg>}
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
            <Button>Create</Button>
          </div>
        </NewAlbumPanel>
      )}
      <div>
        <Button onClick={() => setShowNewAlbumPanel(!showNewAlbumPanel)}>
          + Create New Album
        </Button>
        <Button style={{ float: 'right' }}>Done</Button>
      </div>
    </AddToAlbumContainer>
  );
}
