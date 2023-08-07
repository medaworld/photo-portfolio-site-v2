import { signOut } from '@firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { auth } from '../../lib/firebase';
import { useState } from 'react';

const SidebarContainer = styled.div<{ isSidebarOpen: boolean }>`
  position: relative;
  width: ${(props) => (props.isSidebarOpen ? '250px' : '0px')};
  transition: width 0.3s ease-in-out;
  color: ${(props) => props.theme.dark};
  display: flex;

  padding: 50px 15px;

  a {
    font-size: 16px;
    margin-bottom: 15px;
  }
`;

const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ActiveSidebarLink = styled.div`
  color: #ddd;
  cursor: default;
  margin-bottom: 15px;
`;

const SidebarLinkWrapper = styled.div`
  color: ${(props) => props.theme.dark};
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #ddd;
  }
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

const ToggleButton = styled.button<{ isSidebarOpen: boolean }>`
  background: none;
  border: none;
  font: inherit;
  font-size: 24px;
  cursor: pointer;
  outline: inherit;
  position: absolute;
  right: 0;
  top: 0;
  padding: 0;
  width: 30px;
  color: ${(props) => props.theme.dark};
  height: 100%;

  &:hover {
    color: ${(props) => props.theme.darker};
  }
`;

export default function AdminSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      router.push('/secure/admin');
    } catch (error) {
      console.log('Logout Error: ', error.message);
    }
  };

  const renderLink = (href: string, text: string) => {
    if (router.pathname === href) {
      return <ActiveSidebarLink>{text}</ActiveSidebarLink>;
    }
    return (
      <Link href={href} passHref>
        <SidebarLinkWrapper>{text}</SidebarLinkWrapper>
      </Link>
    );
  };

  return (
    <SidebarContainer isSidebarOpen={isSidebarOpen}>
      <SidebarMenu>
        {renderLink('/secure/admin/dashboard', 'Dashboard')}
        {renderLink('/secure/admin/upload', 'Upload Image')}
        {renderLink('/secure/admin/photos', 'Photos')}
        {renderLink('/secure/admin/categories', 'Categories')}
        {renderLink('/secure/admin/subcategories', 'Subcategories')}
        <LogoutButton onClick={logoutHandler}>Logout</LogoutButton>
      </SidebarMenu>
      <ToggleButton
        isSidebarOpen={isSidebarOpen}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? '⟨' : '⟩'}
      </ToggleButton>
    </SidebarContainer>
  );
}
