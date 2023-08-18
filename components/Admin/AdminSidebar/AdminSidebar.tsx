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
import { RxGrid } from 'react-icons/rx';
import { PiUploadSimpleBold, PiImageSquareBold } from 'react-icons/pi';
import { BiPhotoAlbum, BiCollection, BiLogOut } from 'react-icons/bi';

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

  const renderLink = (href: string, text: string, icon?: any) => {
    if (router.pathname.includes(href)) {
      return (
        <ActiveSidebarLink>
          {icon} {text}
        </ActiveSidebarLink>
      );
    }
    return (
      <Link href={href} passHref>
        <SidebarLinkWrapper>
          {icon} {text}
        </SidebarLinkWrapper>
      </Link>
    );
  };

  return (
    <SidebarContainer isSidebarOpen={isSidebarOpen}>
      <SidebarMenu>
        {renderLink('/secure/admin/dashboard', 'Dashboard', <RxGrid />)}
        {renderLink('/secure/admin/upload', 'Upload', <PiUploadSimpleBold />)}
        {renderLink('/secure/admin/images', 'Images', <PiImageSquareBold />)}
        {renderLink('/secure/admin/albums', 'Albums', <BiPhotoAlbum />)}
        {renderLink(
          '/secure/admin/collections',
          'Collections',
          <BiCollection />
        )}
        <LogoutButton onClick={logoutHandler}>
          <BiLogOut /> Logout
        </LogoutButton>
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
