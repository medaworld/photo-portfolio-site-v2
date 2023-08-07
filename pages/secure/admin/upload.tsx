import { styled } from 'styled-components';
import AdminSidebar from '../../../components/Admin/AdminSidebar';
import AdminUpload from '../../../components/Admin/AdminUpload';

const UploadContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: calc(100vh - 55px);
  padding-top: 55px;
  background-color: ${(props) => props.theme.background};
`;

export default function UploadImage() {
  return (
    <UploadContainer>
      <AdminSidebar />
      <AdminUpload />
    </UploadContainer>
  );
}
