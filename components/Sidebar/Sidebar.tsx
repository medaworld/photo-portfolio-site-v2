import Link from 'next/link';
import { useState } from 'react';
import { styled } from 'styled-components';

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

const SidebarContainer = styled.div<{ collapsed: boolean }>`
  width: ${(props) => (props.collapsed ? '0' : '20%')};
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
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        text-underline-offset: 3px;
        text-decoration-thickness: 1px;
      }
    }
  }
`;

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <CollapseButton onClick={() => setCollapsed(!collapsed)}>
        <CollapseIcon>{collapsed ? '»' : '«'}</CollapseIcon>
      </CollapseButton>
      <SidebarContainer collapsed={collapsed}>
        <Menu collapsed={collapsed}>
          <li>
            <Link href={'/work/concert'}>Concert</Link>
          </li>
          <li>
            <Link href={'/work/people'}>People</Link>
          </li>
          <li>
            <Link href={'/work/travel'}>Travel</Link>
          </li>
          <li>
            <Link href={'/work/35mm'}>35mm</Link>
          </li>
        </Menu>
      </SidebarContainer>
    </>
  );
}
