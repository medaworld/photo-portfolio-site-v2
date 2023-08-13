import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { firestore } from '../../../lib/firebase';
import AdminSidebar from '../../../components/Admin/AdminSidebar';
import { fetchCategories, fetchCount } from '../../../utils/firebaseUtils';
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

export default function AdminDashboard({
  imageCount,
  albumCount,
  collectionCount,
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated' || !session) {
      console.log('Redirecting...');
      router.push('/work');
    }
  }, [router, session, status]);

  if (status === 'loading') {
    return <LoadingScreen />;
  }

  return (
    <AdminDashboardContainer>
      <AdminSidebar />
      <DashboardCard>
        <h1>Welcome, Admin!</h1>
        <p>Total Images: {imageCount}</p>
        <p>Total Albums: {albumCount}</p>
        <p>Total Collections: {collectionCount}</p>
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

  const imageCount = await fetchCount('images');
  const albumCount = await fetchCount('albums');
  const collectionCount = await fetchCount('collections');

  return {
    props: {
      imageCount,
      albumCount,
      collectionCount,
    },
  };
};
