import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { firestore } from '../../../../lib/firebase';
import { styled } from 'styled-components';
import WorkContent from '../../../../components/Work/Work';

const MainContentContainer = styled.div<{ showMain: boolean }>`
  background-color: white;
`;

export default function Work({ images, crumbData }) {
  const list = images.map((image) => {
    return {
      image: image.url,
    };
  });

  return (
    <MainContentContainer showMain={true} id="main-content">
      <WorkContent list={list} crumbData={crumbData} />
    </MainContentContainer>
  );
}

export async function getStaticPaths() {
  try {
    const q = query(
      collection(firestore, 'subcategories'),
      orderBy('subcategory', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const paths = querySnapshot.docs.map((doc) => ({
      params: {
        category: doc.data().category_lower.toString(),
        subcategory: doc.data().subcategory_lower.toString(),
      },
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
  const subcategory = params.subcategory;

  try {
    const subcategoriesCollection = query(
      collection(firestore, 'images'),
      where('subcategory_lower', '==', subcategory)
    );
    const querySnapshot = await getDocs(subcategoriesCollection);

    const crumbData = [
      {
        name: querySnapshot.docs[0].data().category,
        url: `/work/${querySnapshot.docs[0].data().category_lower}`,
      },
      {
        name: querySnapshot.docs[0].data().subcategory,
        url: `/work/${querySnapshot.docs[0].data().category_lower}/${
          querySnapshot.docs[0].data().subcategory_lower
        }`,
      },
    ];

    const promise = querySnapshot.docs.map((doc) => ({
      category: doc.data().category,
      subcategory: doc.data().subcategory,
      id: doc.data().id,
      url: doc.data().url,
      description: doc.data().description,
    }));

    const images = await Promise.all(promise);

    return {
      props: { images, crumbData },
    };
  } catch (err) {
    console.error('Failed to fetch categories:', err);
    return {
      props: { error: 'Failed to load categories, please try again later.' },
    };
  }
}
