import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../api/auth/[...nextauth]';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import LoadingScreen from '../../../../components/common/Loading';
import { fetchCollectionData } from '../../../../utils/firebaseUtils';
import AdminLayout from '../../../../components/Admin/AdminLayout';
import AdminEditCollection from '../../../../components/Admin/AdminCollections/AdminEditCollection/AdminEditCollection';

export default function AdminCollection({ collection }) {
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
      <AdminEditCollection collection={collection} type={'collection'} />
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

  const collectionId = context.params?.collectionid as string;

  const collectionData = await fetchCollectionData(collectionId);

  return {
    props: {
      collection: collectionData,
    },
  };
};
