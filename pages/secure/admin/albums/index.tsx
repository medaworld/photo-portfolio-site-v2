import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../api/auth/[...nextauth]';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import LoadingScreen from '../../../../components/Loading/Loading';
import AdminAlbumsLibrary from '../../../../components/Admin/AdminAlbums/AdminAlbumsLibrary/AdminAlbumsLibrary';
import { fetchAlbums } from '../../../../utils/firebaseUtils';
import AdminLayout from '../../../../components/Admin/AdminLayout';

export default function AdminAlbums({ albums }) {
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
      <AdminAlbumsLibrary items={albums} type={'album'} />
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

  const albums = await fetchAlbums();

  return {
    props: {
      albums: albums,
    },
  };
};
