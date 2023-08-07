import { styled } from 'styled-components';
import ImageGrid from '../ImageGrid/ImageGrid';
import Sidebar from '../Sidebar/Sidebar';

const WorkContainer = styled.div`
  display: flex;
  padding-top: 55px;
`;

export default function WorkContent({ list, crumbData }: { list; crumbData? }) {
  const sections = list.map((listItem) => {
    return listItem.image;
  });

  const containsOption = list.some((listItem) =>
    listItem.hasOwnProperty('option')
  );

  const options = containsOption
    ? list.map((listItem) => listItem.option ?? null)
    : null;

  return (
    <WorkContainer>
      <Sidebar options={options} crumbData={crumbData} />
      <ImageGrid sections={sections} />
    </WorkContainer>
  );
}
