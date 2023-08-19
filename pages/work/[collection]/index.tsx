import { styled } from 'styled-components';
import WorkContent from '../../../components/Work/Work';
import {
  fetchCollectionDataByTitle,
  fetchCollections,
} from '../../../utils/firebaseUtils';

const MainContentContainer = styled.div``;

export default function Work({ albums, crumbData }) {
  return (
    <MainContentContainer id="main-content">
      <WorkContent
        sidebarList={albums}
        gridItems={albums}
        crumbData={crumbData}
      />
    </MainContentContainer>
  );
}

export async function getStaticPaths() {
  try {
    const collections = await fetchCollections();
    const paths = collections.map((collection) => ({
      params: { collection: collection.pathTitle },
    }));

    return {
      paths,
      fallback: false,
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
  const collectionTitle = params.collection;

  try {
    const collection = await fetchCollectionDataByTitle(collectionTitle);

    const albums = collection.albums.map((album) => ({
      ...album,
      path: `/work/${collectionTitle}/${album.pathTitle}`,
    }));

    const crumbData = [
      {
        name: collection.title,
        url: `/work/${collection.pathTitle}`,
      },
    ];

    return {
      props: { albums, crumbData },
      revalidate: 60,
    };
  } catch (err) {
    console.error('Failed to fetch categories:', err);
    return {
      props: { error: 'Failed to load categories, please try again later.' },
      revalidate: 60,
    };
  }
}
