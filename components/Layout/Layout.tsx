import { styled } from 'styled-components';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { useContext } from 'react';
import { GlobalStateContext } from '../../context/globalState/GlobalStateContext';

const LayoutMain = styled.main`
  width: 100%;
  height: 100%;
`;

const Layout = ({ children }) => {
  const { showMain } = useContext(GlobalStateContext);
  return (
    <>
      <Navbar showMain={showMain} />
      <LayoutMain id={'top'}>{children}</LayoutMain>
      <Footer />
    </>
  );
};

export default Layout;
