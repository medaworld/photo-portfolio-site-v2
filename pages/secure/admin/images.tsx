import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { fetchImages } from '../../../utils/firebaseUtils';
import LoadingScreen from '../../../components/common/Loading';
import AdminPhotoLibrary from '../../../components/Admin/AdminImages/AdminImageLibrary';
import AdminLayout from '../../../components/Admin/AdminLayout';

export default function AdminPhotos({ images }) {
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
      <AdminPhotoLibrary images={images} />
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

  const images = await fetchImages({});

  return {
    props: { images },
  };
};
