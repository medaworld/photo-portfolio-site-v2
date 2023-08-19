import { styled } from 'styled-components';
import ImageGrid from './ImageGrid';
import Sidebar from './Sidebar';

const WorkContainer = styled.div`
  display: flex;
  padding-top: 55px;
`;

export default function WorkContent({ sidebarList, gridItems }) {
  const sections = gridItems.map((listItem) => {
    return listItem.image;
  });

  return (
    <WorkContainer>
      <Sidebar options={sidebarList} />
      <ImageGrid gridItems={gridItems} crumbData={undefined} />
    </WorkContainer>
  );
}
