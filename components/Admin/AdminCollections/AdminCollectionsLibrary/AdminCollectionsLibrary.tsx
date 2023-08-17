import Link from 'next/link';
import {
  AddCollectionButton,
  AdminCollectionsLibraryContainer,
  CollectionCard,
  CollectionCardInfo,
  CollectionText,
  Collections,
} from './AdminCollectionsLibraryStyles';
import { capitalizeFirstLetter } from '../../../../utils/stringUtils';

export default function AdminCollectionsLibrary({ items, type }) {
  const capitalType = capitalizeFirstLetter(type);
  const pluralType = type + 's';
  return (
    <AdminCollectionsLibraryContainer>
      <h1>{capitalType + 's'}</h1>
      <Link href={`/secure/admin/${pluralType}/new`}>
        <AddCollectionButton type="button">
          Add New {capitalType}
        </AddCollectionButton>
      </Link>

      <Collections>
        {items.map((item) => (
          <Link href={`/secure/admin/${pluralType}/${item.id}`} key={item.id}>
            <CollectionCard style={{ backgroundImage: `url(${item.cover})` }}>
              <CollectionCardInfo>
                <CollectionText>{item.title}</CollectionText>
                <CollectionText>
                  {item.count} {type === 'collection' ? 'albums' : 'photos'}
                </CollectionText>
              </CollectionCardInfo>
            </CollectionCard>
          </Link>
        ))}
      </Collections>
    </AdminCollectionsLibraryContainer>
  );
}
