import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]';
import { GetServerSideProps } from 'next';
import { NotificationContext } from '../../../context/notification/NotificationContext';
import {
  AdminLoginContainer,
  ErrorText,
  LoginForm,
} from '../../../components/Admin/AdminLogin/AdminLoginStyles';
import StyledInput from '../../../components/common/StyledInput';
import StyledButton from '../../../components/common/StyledButton';

export default function AdminLogin() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [error, setError] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();
  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    if (session) {
      router.push('/secure/admin/dashboard');
    }
  }, [router, session]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const email = enteredEmail;
    const password = enteredPassword;

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (!result.error) {
      notificationCtx.showNotification({
        title: 'Success',
        message: 'Successfully logged in!',
        status: 'success',
      });
      router.push('/secure/admin/dashboard');
    } else {
      notificationCtx.showNotification({
        title: 'Error',
        message: 'Unauthorized access',
        status: 'error',
      });
      setError(result.error);
    }
  };

  return (
    <AdminLoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <StyledInput
          variant="primary"
          type="text"
          onChange={(e) => setEnteredEmail(e.target.value)}
          placeholder="Email"
        />
        <StyledInput
          variant="primary"
          type="password"
          onChange={(e) => setEnteredPassword(e.target.value)}
          placeholder="Password"
        />
        <StyledButton variant="primary" type="submit">
          Login
        </StyledButton>
        {error && <ErrorText>{error}</ErrorText>}
      </LoginForm>
    </AdminLoginContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: '/secure/admin/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
