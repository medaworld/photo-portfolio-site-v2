import { styled } from 'styled-components';

export const SidebarContainer = styled.div<{ isSidebarOpen: boolean }>`
  position: relative;
  display: flex;
  width: ${(props) => (props.isSidebarOpen ? '300px' : '30px')};
  transition: width 0.3s ease-in-out;
  border-right: 1px solid ${(props) => props.theme.border};
  padding-left: ${(props) => (props.isSidebarOpen ? '15px' : '0')};

  div {
    transition: opacity 0.2s ease;
    opacity: ${(props) => (props.isSidebarOpen ? '100%' : '0')};
  }

  a {
    margin-bottom: 10px;
  }
`;

export const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  padding: 50px 0;
`;

export const ActiveSidebarLink = styled.div`
  cursor: default;
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.hover};
  overflow: hidden;
`;

export const SidebarLinkWrapper = styled.div`
  cursor: pointer;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
  white-space: nowrap;

  &:hover {
    background-color: ${(props) => props.theme.hover};
  }
`;

export const LogoutButton = styled.button`
  color: ${(props) => props.theme.primary};
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 5px;

  &:hover {
    background-color: ${(props) => props.theme.hover};
  }
`;

export const ToggleButton = styled.button<{ isSidebarOpen: boolean }>`
  background-color: transparent;
  color: ${(props) => props.theme.primary};
  border: none;
  font: inherit;
  font-size: 24px;
  cursor: pointer;
  padding: 0 10px;
  height: 100%;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.5;
  }
`;
