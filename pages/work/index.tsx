import { styled } from 'styled-components';
import WorkContent from '../../components/Work/Work';
import {
  fetchAlbumsWithPath,
  fetchCollections,
} from '../../utils/firebaseUtils';
import { titleToPath } from '../../utils/stringUtils';

const MainContentContainer = styled.div``;

export default function Work({ albums, collections }) {
  return (
    <MainContentContainer id="main-content">
      <WorkContent sidebarList={collections} gridItems={albums} />
    </MainContentContainer>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const collections = await fetchCollections();
    const albums = await fetchAlbumsWithPath();

    const collectionsWithPaths = collections.map((collection) => ({
      ...collection,
      path: `/work/${titleToPath(collection.title)}`,
    }));
    return {
      props: { collections: collectionsWithPaths, albums },
    };
  } catch (err) {
    console.error('Failed to fetch categories:', err);
    return {
      props: { error: 'Failed to load categories, please try again later.' },
    };
  }
}
