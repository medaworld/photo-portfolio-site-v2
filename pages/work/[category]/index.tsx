import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { firestore } from '../../../lib/firebase';
import { styled } from 'styled-components';
import Layout from '../../../components/Layout/Layout';
import WorkContent from '../../../components/Work/Work';

const MainContentContainer = styled.div<{ showMain: boolean }>`
  background-color: white;
  padding-top: 55px;
  transition: margin-top 1s ease;
`;

export default function Work({ subcategories }) {
  const sec = [];
  subcategories.map((subcategory) => {
    sec.push(subcategory.coverImg);
  });

  return (
    <MainContentContainer showMain={true} id="main-content">
      <WorkContent sections={sec} />
    </MainContentContainer>
  );
}

export async function getStaticPaths() {
  try {
    const q = query(
      collection(firestore, 'categories'),
      orderBy('category', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const paths = querySnapshot.docs.map((doc) => ({
      params: { category: doc.data().category_lower.toString() },
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
  const category = params.category;

  try {
    const subcategoriesCollection = query(
      collection(firestore, 'subcategories'),
      where('category_lower', '==', category),
      orderBy('subcategory', 'asc')
    );
    const querySnapshot = await getDocs(subcategoriesCollection);

    const promise = querySnapshot.docs.map((doc) => ({
      category: doc.data().category,
      subcategory: doc.data().subcategory,
      id: doc.data().id,
      coverImg: doc.data().coverImg,
      category_lower: doc.data().category_lower,
      subcategory_lower: doc.data().subcategory_lower,
      key: doc.data().id,
    }));

    const subcategories = await Promise.all(promise);

    return {
      props: { subcategories },
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