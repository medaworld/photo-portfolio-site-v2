import { styled } from 'styled-components';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const LayoutMain = styled.main`
  width: 100%;
  height: 100%;
`;

const Layout = ({ children, showMain }) => {
  return (
    <>
      <Navbar showMain={showMain} />
      <LayoutMain id={'top'}>{children}</LayoutMain>
      <Footer />
    </>
  );
};

export default Layout;
