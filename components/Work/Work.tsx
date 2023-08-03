import { styled } from 'styled-components';
import { useState } from 'react';
import ImageGrid from '../ImageGrid/ImageGrid';
import { sections } from '../../utils/dummyData';

const WorkContainer = styled.div`
  display: flex;
`;

const CollapseButton = styled.div`
  position: fixed;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.tplight};
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  font-family: 'Raleway';
  font-size: 35px;
  font-weight: 100;
  margin: 1rem;
  z-index: 3;
  user-select: none;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const CollapseIcon = styled.div`
  position: absolute;
  top: -20%;
`;

const Sidebar = styled.div<{ collapsed: boolean }>`
  width: ${(props) => (props.collapsed ? '0' : '50%')};
  overflow: hidden;
  position: relative;
  padding: ${(props) => (props.collapsed ? '1rem 0' : '1rem')};
  font-family: 'Raleway';
  font-size: 36px;
  font-weight: 100;
  transition: all 0.3s;
`;

const Menu = styled.ul<{ collapsed: boolean }>`
  position: ${(props) => (props.collapsed ? 'relative' : 'fixed')};
  list-style: none;
  padding: 0;
  margin: 3rem 0;
  z-index: 3;

  li {
    width: fit-content;
    padding: 0 8px;
    background-color: ${(props) => props.theme.tplight};
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    margin-bottom: 10px;
    a {
      color: #fff;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const MainContent = styled.div``;

export default function Work() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <WorkContainer>
      <CollapseButton onClick={() => setCollapsed(!collapsed)}>
        <CollapseIcon>{collapsed ? '»' : '«'}</CollapseIcon>
      </CollapseButton>
      <Sidebar collapsed={collapsed}>
        <Menu collapsed={collapsed}>
          <li>Concert</li>
          <li>People</li>
          <li>Travel</li>
          <li>35mm</li>
        </Menu>
      </Sidebar>
      <MainContent>
        <ImageGrid sections={sections} />
      </MainContent>
    </WorkContainer>
  );
}
