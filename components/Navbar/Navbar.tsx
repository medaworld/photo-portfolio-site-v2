import React, { useState } from 'react';
import { NavLinkList } from '../../utils/dummyData';
import {
  HamburgerBar,
  HamburgerMenu,
  NavLink,
  NavLinks,
  NavbarContainer,
  SocialWrapper,
  Links,
  SocialLink,
} from './NavbarStyles';
import { FaInstagram } from 'react-icons/fa';
import Logo from '../common/Logo';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <NavbarContainer isOpen={isMenuOpen}>
      <Logo src="/images/logo.png" alt="MEDA Logo" />
      <Links>
        <NavLinks isOpen={isMenuOpen}>
          {NavLinkList.map((navLink, key) => {
            return (
              <NavLink key={key}>
                <a>{navLink.title}</a>
              </NavLink>
            );
          })}
        </NavLinks>
        <HamburgerMenu onClick={toggleMenu}>
          <HamburgerBar isOpen={isMenuOpen} />
          <HamburgerBar isOpen={isMenuOpen} />
          <HamburgerBar isOpen={isMenuOpen} />
        </HamburgerMenu>
        <SocialWrapper isOpen={isMenuOpen}>
          <SocialLink
            href="https://www.instagram.com/meda.world"
            target="_blank"
          >
            <FaInstagram size={20} />
          </SocialLink>
        </SocialWrapper>
      </Links>
    </NavbarContainer>
  );
};

export default React.memo(Navbar);
