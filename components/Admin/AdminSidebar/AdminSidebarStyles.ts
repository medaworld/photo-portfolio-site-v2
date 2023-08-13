import { styled } from 'styled-components';

export const SidebarContainer = styled.div<{ isSidebarOpen: boolean }>`
  background-color: ${(props) => props.theme.footer};
  position: relative;
  width: ${(props) => (props.isSidebarOpen ? '250px' : '0px')};
  transition: width 0.3s ease-in-out;
  color: ${(props) => props.theme.dark};
  display: flex;

  padding: 50px 15px;

  a {
    font-size: 16px;
    margin-bottom: 15px;
  }
`;

export const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ActiveSidebarLink = styled.div`
  color: #ddd;
  cursor: default;
  margin-bottom: 15px;
`;

export const SidebarLinkWrapper = styled.div`
  color: ${(props) => props.theme.dark};
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #ddd;
  }
`;

export const LogoutButton = styled.button`
  color: ${(props) => props.theme.dark};
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  display: flex;

  &:hover {
    color: #ddd;
  }
`;

export const ToggleButton = styled.button<{ isSidebarOpen: boolean }>`
  background-color: ${(props) => props.theme.footer};
  color: ${(props) => props.theme.primary};
  border: none;
  font: inherit;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: calc(100vh - 110px);
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.hover};
  }
`;
