import { signOut } from '@firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { auth } from '../../lib/firebase';

const SidebarContainer = styled.div`
  width: 250px;
  color: ${(props) => props.theme.dark};
  display: flex;
  flex-direction: column;
  padding: 50px 20px;

  a {
    font-size: 16px;
    margin-bottom: 15px;
  }
`;

const SidebarLink = styled.div`
  color: ${(props) => props.theme.dark};
  text-decoration: none;

  &:hover {
    color: #ddd;
  }
`;

const ActiveSidebarLink = styled(SidebarLink)`
  color: ${(props) => props.theme.color};
  font-weight: bold;
`;

const LogoutButton = styled.button`
  color: ${(props) => props.theme.dark};
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  display: flex;

  &:hover {
    color: #ddd;
  }
`;

export default function AdminSidebar() {
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      router.push('/secure/admin');
    } catch (error) {
      console.log('Logout Error: ', error.message);
    }
  };

  return (
    <SidebarContainer>
      <Link href="/secure/admin/dashboard" passHref>
        {router.pathname === '/secure/admin/dashboard' ? (
          <ActiveSidebarLink>Dashboard</ActiveSidebarLink>
        ) : (
          <SidebarLink>Dashboard</SidebarLink>
        )}
      </Link>
      <Link href="/secure/admin/upload" passHref>
        {router.pathname === '/secure/admin/upload' ? (
          <ActiveSidebarLink>Upload Image</ActiveSidebarLink>
        ) : (
          <SidebarLink>Upload Image</SidebarLink>
        )}
      </Link>
      <Link href="/secure/admin/photos" passHref>
        {router.pathname === '/secure/admin/photos' ? (
          <ActiveSidebarLink>Photos</ActiveSidebarLink>
        ) : (
          <SidebarLink>Photos</SidebarLink>
        )}
      </Link>
      <Link href="/secure/admin/categories" passHref>
        {router.pathname === '/secure/admin/categories' ? (
          <ActiveSidebarLink>Categories</ActiveSidebarLink>
        ) : (
          <SidebarLink>Categories</SidebarLink>
        )}
      </Link>
      <Link href="/secure/admin/subcategories" passHref>
        {router.pathname === '/secure/admin/subcategories' ? (
          <ActiveSidebarLink>Subcategories</ActiveSidebarLink>
        ) : (
          <SidebarLink>Subcategories</SidebarLink>
        )}
      </Link>
      <LogoutButton onClick={logoutHandler}>Logout</LogoutButton>
    </SidebarContainer>
  );
}
