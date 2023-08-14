import { styled } from 'styled-components';
import AdminSidebar from './AdminSidebar/AdminSidebar';

const AdminContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 55px;
  background-color: ${(props) => props.theme.background};
`;

export default function AdminLayout({ children }) {
  return (
    <AdminContainer>
      <AdminSidebar />
      {children}
    </AdminContainer>
  );
}
