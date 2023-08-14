import { styled } from 'styled-components';
import AdminSidebar from '../../../../components/Admin/AdminSidebar/AdminSidebar';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../api/auth/[...nextauth]';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import LoadingScreen from '../../../../components/Loading/Loading';
import { fetchAlbumData } from '../../../../utils/firebaseUtils';
import AdminEditAlbum from '../../../../components/Admin/AdminAlbums/AdminEditAlbum/AdminEditAlbum';

const AlbumEditContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: calc(100vh - 55px);
  padding-top: 55px;
  background-color: ${(props) => props.theme.background};
`;

export default function AdminAlbum({ album }) {
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
    <AlbumEditContainer>
      <AdminSidebar />
      <AdminEditAlbum albumData={album} />
    </AlbumEditContainer>
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

  const albumId = context.params?.albumid as string;

  const albumData = await fetchAlbumData(albumId);

  return {
    props: {
      album: albumData,
    },
  };
};
