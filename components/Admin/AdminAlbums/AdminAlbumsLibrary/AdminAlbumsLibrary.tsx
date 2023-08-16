import Link from 'next/link';
import {
  AddAlbumButton,
  AdminAlbumsLibraryContainer,
  AlbumCard,
  AlbumCardInfo,
  AlbumText,
  Albums,
} from './AdminAlbumsLibraryStyles';
import { capitalizeFirstLetter } from '../../../../utils/stringUtils';

export default function AdminAlbumsLibrary({ items, type }) {
  const capitalType = capitalizeFirstLetter(type);
  const pluralType = type + 's';
  return (
    <AdminAlbumsLibraryContainer>
      <h1>{capitalType + 's'}</h1>
      <Link href={`/secure/admin/${pluralType}/new`}>
        <AddAlbumButton type="button">Add New {capitalType}</AddAlbumButton>
      </Link>

      <Albums>
        {items.map((item) => (
          <Link href={`/secure/admin/${pluralType}/${item.id}`} key={item.id}>
            <AlbumCard style={{ backgroundImage: `url(${item.cover})` }}>
              <AlbumCardInfo>
                <AlbumText>{item.title}</AlbumText>
                <AlbumText>
                  {item.count} {type === 'collection' ? 'albums' : 'photos'}
                </AlbumText>
              </AlbumCardInfo>
            </AlbumCard>
          </Link>
        ))}
      </Albums>
    </AdminAlbumsLibraryContainer>
  );
}
