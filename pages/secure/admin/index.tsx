import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { styled } from 'styled-components';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { NotificationContext } from '../../../context/notification/NotificationContext';

const AdminLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 55px);
  padding: 55px 0;
  background-color: ${(props) => props.theme.background};
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 15px;
`;

const LoginInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.formBorder};
  font-size: 16px;
`;

const LoginButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: ${(props) => props.theme.dark};
  color: ${(props) => props.theme.background};
  cursor: pointer;
  font-size: 16px;
`;

const ErrorText = styled.p`
  color: red;
`;

export default function AdminLogin() {
  const notificationCtx = useContext(NotificationContext);
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      if (currentUser) {
        router.push('/secure/admin/dashboard');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, enteredEmail, enteredPassword);
      notificationCtx.showNotification({
        title: 'Success',
        message: 'Successfully logged in!',
        status: 'success',
      });
      router.push('/secure/admin/dashboard');
    } catch (error) {
      notificationCtx.showNotification({
        title: 'Error',
        message: 'Unauthorized access',
        status: 'error',
      });
      setError(error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AdminLoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <LoginInput
          type="text"
          onChange={(e) => setEnteredEmail(e.target.value)}
          placeholder="Email"
        />
        <LoginInput
          type="password"
          onChange={(e) => setEnteredPassword(e.target.value)}
          placeholder="Password"
        />
        <LoginButton type="submit">Login</LoginButton>
        {error && <ErrorText>{error}</ErrorText>}
      </LoginForm>
    </AdminLoginContainer>
  );
}
