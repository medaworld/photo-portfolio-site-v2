import { styled } from 'styled-components';
import AdminSidebar from '../../../../components/Admin/AdminSidebar/AdminSidebar';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../api/auth/[...nextauth]';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import LoadingScreen from '../../../../components/Loading/Loading';
import AdminNewAlbum from '../../../../components/Admin/AdminAlbums/AdminNewAlbum/AdminNewAlbum';
import { fetchImages } from '../../../../utils/firebaseUtils';

const NewAlbumContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: calc(100vh - 55px);
  padding-top: 55px;
  background-color: ${(props) => props.theme.background};
`;

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
    <NewAlbumContainer>
      <AdminSidebar />
      <AdminNewAlbum images={images} />
    </NewAlbumContainer>
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
