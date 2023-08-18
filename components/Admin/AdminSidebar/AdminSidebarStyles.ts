import { styled } from 'styled-components';

export const SidebarContainer = styled.div<{ isSidebarOpen: boolean }>`
  background-color: ${(props) => props.theme.footer};
  position: relative;
  display: flex;
  padding: 50px 15px;
  width: ${(props) => (props.isSidebarOpen ? '250px' : '0px')};
  transition: width 0.3s ease-in-out;

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
  color: ${(props) => props.theme.dark};
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
  background-color: ${(props) => props.theme.footer};
  color: ${(props) => props.theme.primary};
  border: none;
  font: inherit;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  padding: 0;
  width: 25px;
  height: 100%;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.hover};
  }
`;
