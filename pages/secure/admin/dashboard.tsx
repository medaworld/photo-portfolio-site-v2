import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { fetchCount } from '../../../utils/firebaseUtils';
import { GetServerSideProps } from 'next';
import { authOptions } from '../../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
import { useSession } from 'next-auth/react';
import LoadingScreen from '../../../components/Loading/Loading';
import Link from 'next/link';

import { DashboardCard } from '../../../components/Admin/AdminDashboard/AdminDashboardStyles';
import AdminLayout from '../../../components/Admin/AdminLayout';

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
    <AdminLayout>
      <DashboardCard>
        <h1>Welcome!</h1>
        <p>
          Total Images: <Link href={'/secure/admin/images'}>{imageCount}</Link>
        </p>
        <p>
          Total Albums: <Link href={'/secure/admin/albums'}>{albumCount}</Link>
        </p>
        <p>
          Total Collections:{' '}
          <Link href={'/secure/admin/collections'}>{collectionCount}</Link>
        </p>
      </DashboardCard>
    </AdminLayout>
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
