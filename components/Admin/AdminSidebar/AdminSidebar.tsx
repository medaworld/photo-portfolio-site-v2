import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { signOut } from 'next-auth/react';
import { NotificationContext } from '../../../context/notification/NotificationContext';
import {
  ActiveSidebarLink,
  LogoutButton,
  SidebarContainer,
  SidebarLinkWrapper,
  SidebarMenu,
  ToggleButton,
} from './AdminSidebarStyles';

export default function AdminSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const notificationCtx = useContext(NotificationContext);

  const logoutHandler = () => {
    signOut({
      callbackUrl: '/secure/admin',
      redirect: true,
    })
      .then(() => {
        notificationCtx.showNotification({
          title: 'Success',
          message: 'Logged out successfully!',
          status: 'success',
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error',
          message: 'Error logging out',
          status: 'error',
        });
        console.error('Logout Error: ', error.message);
      });
  };

  const renderLink = (href: string, text: string) => {
    if (router.pathname.includes(href)) {
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
        {renderLink('/secure/admin/upload', 'Upload')}
        {renderLink('/secure/admin/images', 'Images')}
        {renderLink('/secure/admin/albums', 'Albums')}
        {renderLink('/secure/admin/collections', 'Collections')}
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
