import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../api/auth/[...nextauth]';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import LoadingScreen from '../../../../components/Loading/Loading';
import { fetchImages } from '../../../../utils/firebaseUtils';
import AdminLayout from '../../../../components/Admin/AdminLayout';
import AdminNewCollection from '../../../../components/Admin/AdminCollections/AdminNewCollection/AdminNewCollection';

export default function NewAlbum({ images }) {
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
      <AdminNewCollection items={images} type={'album'} />
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
    props: { images: images },
  };
};
