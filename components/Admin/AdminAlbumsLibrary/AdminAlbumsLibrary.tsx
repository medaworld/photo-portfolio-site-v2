import Link from 'next/link';
import {
  AddAlbumButton,
  AdminAlbumsLibraryContainer,
  AlbumCard,
  AlbumCardInfo,
  AlbumText,
  Albums,
} from './AdminAlbumsLibraryStyles';

export default function AdminAlbumsLibrary({ albums }) {
  return (
    <AdminAlbumsLibraryContainer>
      <h1>Albums</h1>
      <Link href="/secure/admin/albums/new">
        <AddAlbumButton type="button">Add New Album</AddAlbumButton>
      </Link>

      <Albums>
        {albums.map((album) => (
          <Link href={`/secure/admin/albums/${album.id}`} key={album.id}>
            <AlbumCard style={{ backgroundImage: `url(${album.cover})` }}>
              <AlbumCardInfo>
                <AlbumText>{album.title}</AlbumText>
                <AlbumText>{album.count} photos</AlbumText>
              </AlbumCardInfo>
            </AlbumCard>
          </Link>
        ))}
      </Albums>
    </AdminAlbumsLibraryContainer>
  );
}
