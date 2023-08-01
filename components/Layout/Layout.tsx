import { styled } from 'styled-components';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const LayoutMain = styled.main`
  padding: 55px 0;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <LayoutMain id={'top'}>{children}</LayoutMain>
      <Footer />
    </>
  );
};

export default Layout;
