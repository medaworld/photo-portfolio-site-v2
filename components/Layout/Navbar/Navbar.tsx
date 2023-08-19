import React, { useEffect, useState } from 'react';
import { NavLinkList } from '../../../utils/dummyData';
import {
  HamburgerBar,
  HamburgerMenu,
  NavLink,
  NavLinks,
  NavbarContainer,
  SocialWrapper,
  Links,
} from './NavbarStyles';

import Logo from '../../common/Logo';
import SocialMediaIcon from '../../common/SocialMediaIcon';
import Link from 'next/link';
import ThemeSwitch from '../../ThemeSwitch/ThemeSwitch';
import { useTheme } from 'styled-components';

const Navbar = ({ showMain }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const navbar = document.querySelector('nav');
    if (showMain) {
      navbar.style.transition = 'opacity 0.5s ease 1s';
      navbar.style.opacity = '1';
    } else {
      navbar.style.transition = 'none';
      navbar.style.opacity = '0';
    }
  }, [showMain]);

  return (
    <NavbarContainer isOpen={isMenuOpen}>
      <Logo src="/images/logo.png" alt="MEDA Logo" color={theme.primary} />
      <Links>
        <ThemeSwitch />
        <NavLinks isOpen={isMenuOpen}>
          {NavLinkList.map((navLink, key) => {
            return (
              <NavLink key={key}>
                <Link href={navLink.path}>{navLink.title}</Link>
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
          <SocialMediaIcon
            href={'https://www.instagram.com/meda.world'}
            size={20}
            platform={'instagram'}
          />
        </SocialWrapper>
      </Links>
    </NavbarContainer>
  );
};

export default React.memo(Navbar);
