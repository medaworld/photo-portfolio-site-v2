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
} from './NavbarStyles';

import Logo from '../common/Logo';
import SocialMediaIcon from '../common/SocialMediaIcon';
import Link from 'next/link';

const Navbar = ({ showMain }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <NavbarContainer isOpen={isMenuOpen} showMain={showMain}>
      <Logo src="/images/logo.png" alt="MEDA Logo" />
      <Links>
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
