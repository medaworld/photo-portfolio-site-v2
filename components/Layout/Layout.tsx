import { styled } from 'styled-components';
import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';
import { useContext } from 'react';
import { GlobalStateContext } from '../../context/globalState/GlobalStateContext';
import Notification from '../common/Notification';
import { NotificationContext } from '../../context/notification/NotificationContext';

const LayoutMain = styled.main`
  width: 100%;
  height: 100%;
`;

const Layout = ({ children }) => {
  const { showMain } = useContext(GlobalStateContext);
  const { notification } = useContext(NotificationContext);

  return (
    <>
      <Navbar showMain={showMain} />
      <Notification activeNotification={notification} />
      <LayoutMain id={'top'}>{children}</LayoutMain>
      <Footer />
    </>
  );
};

export default Layout;
