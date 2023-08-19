import { styled } from 'styled-components';
import WorkContent from '../../components/Work/Work';

import { fetchAlbums, fetchCollections } from '../../utils/firebaseUtils';

const MainContentContainer = styled.div``;

export default function Work({ collections, albums }) {
  const list = albums.map((album) => {
    return {
      image: album.cover,
      option: {
        name: album.title,
        path: `/work/${album.title}`,
      },
    };
  });
  console.log(albums);

  return (
    <MainContentContainer id="main-content">
      <WorkContent list={list} />
    </MainContentContainer>
  );
}

export async function getStaticProps() {
  try {
    const collections = await fetchCollections();
    const albums = await fetchAlbums();
    return {
      props: { collections, albums },
      revalidate: 60,
    };
  } catch (err) {
    console.error('Failed to fetch collections:', err);
    return {
      props: { error: 'Failed to load collections, please try again later.' },
      revalidate: 60,
    };
  }
}
