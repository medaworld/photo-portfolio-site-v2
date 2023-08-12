import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { firestore } from '../../../lib/firebase';
import AdminSidebar from '../../../components/Admin/AdminSidebar';
import { fetchCategories } from '../../../utils/firebaseUtils';
import { GetServerSideProps } from 'next';
import { authOptions } from '../../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
import { useSession } from 'next-auth/react';
import LoadingScreen from '../../../components/Loading/Loading';

const AdminDashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: calc(100vh - 55px);
  padding-top: 55px;
  background-color: ${(props) => props.theme.background};
`;

const DashboardCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 30px;
  background-color: #fff;
`;

export default function AdminDashboard() {
  const [totalImages, setTotalImages] = useState(0);
  const [totalSubCategories, setTotalSubCategories] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated' || !session) {
      console.log('Redirecting...');
      router.push('/work');
    }
  }, [router, session, status]);

  useEffect(() => {
    const fetchData = async () => {
      const categories = await fetchCategories(firestore);
      setTotalCategories(categories.length);

      let imageCount = 0;
      let subCategoryCount = 0;
      for (let category of categories) {
        // imageCount += category.images.length;
        // subCategoryCount += category.subcategories.length;
      }

      setTotalImages(imageCount);
      setTotalSubCategories(subCategoryCount);
    };

    fetchData();
  }, []);

  if (status === 'loading') {
    return <LoadingScreen />;
  }

  return (
    <AdminDashboardContainer>
      <AdminSidebar />
      <DashboardCard>
        <h1>Welcome, Admin!</h1>
        <p>Total Images: {totalImages}</p>
        <p>Total Albums: {totalSubCategories}</p>
        <p>Total Collections: {totalCategories}</p>
      </DashboardCard>
    </AdminDashboardContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/work',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
