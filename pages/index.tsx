import { styled } from 'styled-components';
import { slideshowImages } from '../utils/dummyData';
import Slideshow from '../components/Slideshow/Slideshow';
import WorkContent from '../components/Work/Work';
import { fetchAlbumsWithPath, fetchCollections } from '../utils/firebaseUtils';
import useLanding from '../hooks/useLanding';
import { titleToPath } from '../utils/stringUtils';

const MainContentContainer = styled.div<{ showMain: boolean }>`
  margin-top: 150vh;
`;

export default function Home({ albums, collections }) {
  const { showMain } = useLanding();

  return (
    <>
      <Slideshow images={slideshowImages} />
      <MainContentContainer id="main-content" showMain={showMain}>
        <WorkContent sidebarList={collections} gridItems={albums} />
      </MainContentContainer>
    </>
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
