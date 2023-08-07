import { styled } from 'styled-components';
import WorkContent from '../../components/Work/Work';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { firestore } from '../../lib/firebase';

const MainContentContainer = styled.div`
  background-color: white;
`;

export default function Work({ categories }) {
  const list = categories.map((category) => {
    return {
      image: category.coverImg,
      option: {
        name: category.category,
        path: `/work/${category.category_lower}`,
      },
    };
  });

  return (
    <MainContentContainer id="main-content">
      <WorkContent list={list} />
    </MainContentContainer>
  );
}

export async function getStaticProps() {
  try {
    const categoriesCollection = query(
      collection(firestore, 'categories'),
      orderBy('category', 'asc')
    );
    const querySnapshot = await getDocs(categoriesCollection);

    const categories = querySnapshot.docs.map((doc) => ({
      category: doc.data().category,
      category_lower: doc.data().category_lower,
      id: doc.data().id,
      coverImg: doc.data().coverImg,
    }));

    return {
      props: { categories },
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
