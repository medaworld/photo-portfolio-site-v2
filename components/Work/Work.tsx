import { styled } from 'styled-components';
import ImageGrid from '../ImageGrid/ImageGrid';
import Sidebar from '../Sidebar/Sidebar';

const WorkContainer = styled.div`
  display: flex;
`;

export default function WorkContent({ sections }) {
  return (
    <WorkContainer>
      <Sidebar />
      <ImageGrid sections={sections} />
    </WorkContainer>
  );
}
