import { styled } from 'styled-components';
import AdminSidebar from '../../../components/Admin/AdminSidebar';
import AdminUpload from '../../../components/Admin/AdminUpload/AdminUpload';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]';
import { useEffect } from 'react';
import router from 'next/router';
import { useSession } from 'next-auth/react';

const UploadContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: calc(100vh - 55px);
  padding-top: 55px;
  background-color: ${(props) => props.theme.background};
`;

export default function UploadImage() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push('/work');
    }
  }, [session]);

  return (
    <UploadContainer>
      <AdminSidebar />
      <AdminUpload />
    </UploadContainer>
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
