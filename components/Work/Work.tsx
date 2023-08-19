import { styled } from 'styled-components';
import ImageGrid from './ImageGrid';
import Sidebar from './Sidebar';

const WorkContainer = styled.div`
  display: flex;
  padding-top: 55px;
`;

export default function WorkContent({
  sidebarList,
  gridItems,
  crumbData,
}: {
  sidebarList: any;
  gridItems: any;
  crumbData?: any;
}) {
  return (
    <WorkContainer>
      <Sidebar options={sidebarList} />
      <ImageGrid gridItems={gridItems} crumbData={crumbData} />
    </WorkContainer>
  );
}
