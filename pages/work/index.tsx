import { styled } from 'styled-components';
import WorkContent from '../../components/Work/Work';
import {
  fetchAlbumsWithPath,
  fetchCollections,
} from '../../utils/firebaseUtils';

const MainContentContainer = styled.div``;

export default function Work({ albums, collections }) {
  return (
    <MainContentContainer>
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
      path: `/work/${collection.pathTitle}`,
    }));
    return {
      props: { collections: collectionsWithPaths, albums },
    };
  } catch (err) {
    console.error('Failed to fetch:', err);
    return {
      props: { error: 'Failed to load, please try again later.' },
    };
  }
}
