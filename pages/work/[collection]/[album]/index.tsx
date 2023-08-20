import { styled } from 'styled-components';
import {
  fetchAlbumDataByTitle,
  fetchAlbumsWithPath,
} from '../../../../utils/firebaseUtils';
import AlbumImageGrid from '../../../../components/Work/AlbumImageGrid';

const MainContentContainer = styled.div<{ showMain: boolean }>``;

export default function Work({ album, crumbData }) {
  return (
    <MainContentContainer showMain={true} id="main-content">
      <AlbumImageGrid gridItems={album.photos} crumbData={crumbData} />
    </MainContentContainer>
  );
}

export async function getStaticPaths() {
  try {
    const albums = await fetchAlbumsWithPath();
    const paths = albums.map((album) => ({
      params: {
        collection: album.collection,
        album: album.pathTitle,
      },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (err) {
    console.log(err);
    return {
      paths: [],
      fallback: false,
    };
  }
}

export async function getStaticProps(context: { params: any }) {
  const { params } = context;
  const albumTitle = params.album;

  try {
    const album = await fetchAlbumDataByTitle(albumTitle);

    const crumbData = [
      {
        name: album.collection,
        url: `/work/${album.collectionPath}`,
      },
      {
        name: album.title,
        url: `/work/${album.collectionPath}/${album.pathTitle}`,
      },
    ];
    return {
      props: { album, crumbData },
    };
  } catch (err) {
    console.error('Failed to fetch categories:', err);
    return {
      props: { error: 'Failed to load categories, please try again later.' },
    };
  }
}
