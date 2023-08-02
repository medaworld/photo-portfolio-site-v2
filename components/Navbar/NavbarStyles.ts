'use client';

import styled, { css } from 'styled-components';

export const NavbarContainer = styled.nav<{
  isOpen: boolean;
  showMain: boolean;
}>`
  background-color: ${(props) => props.theme.tplight};
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 55px;
  display: flex;
  opacity: ${({ showMain }) => (showMain ? '1' : '0')};
  justify-content: space-between;
  padding: 1rem 1rem;
  z-index: 5;
  max-height: ${({ isOpen }) => (isOpen ? '250px' : '70px')};

  @media (max-width: 768px) {
    align-items: start;
    height: ${({ isOpen }) => (isOpen ? '215px' : 'none')};
    overflow: hidden;
    transition: max-height 0.3s ease;
  }
`;

export const Links = styled.div`
  display: flex;
  align-items: center;
`;

export const NavLinks = styled.ul<{ isOpen: boolean }>`
  display: flex;
  list-style: none;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  padding: 0;
  margin: 0 10px;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 55px;
    left: 0;
    width: 100%;
    padding: 5px;
    margin: 0;

    li {
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }
`;

export const NavLink = styled.li`
  margin-right: 15px;
  font-size: 14px;

  &:last-child {
    margin-right: 0;
  }

  a {
    color: ${(props) => props.theme.dark};
    text-decoration: none;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }
`;

export const SocialWrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-weight: 200;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 160px;
    left: 0;
    width: 100%;
    margin: 0;
    transition: all 0.3s ease;
  }
`;

export const HamburgerMenu = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const HamburgerBar = styled.span<{ isOpen: boolean }>`
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px 0;
  background-color: ${(props) => props.theme.dark};
  transition: all 0.3s ease-in-out;

  ${({ isOpen }) => isOpen && 'transform: translateY(8px) rotate(-45deg);'}

  &:nth-child(2) {
    opacity: ${({ isOpen }) => (isOpen ? 0 : 1)};
  }

  &:last-child {
    ${({ isOpen }) =>
      isOpen && css && 'transform: translateY(-8px) rotate(45deg);'}
  }
`;
