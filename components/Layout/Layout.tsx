import { styled } from 'styled-components';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const LayoutMain = styled.main`
  height: 100vh;
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
