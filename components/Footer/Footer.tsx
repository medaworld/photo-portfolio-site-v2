import React from 'react';
import {
  FooterContainer,
  FooterList,
  FooterItem,
  FooterText,
  FooterLink,
  WarningFooter,
  FooterToTop,
} from './FooterStyle';
import { NavLinkList } from '../../utils/dummyData';
import Logo from '../common/Logo';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition;

      window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <FooterContainer>
        <Logo src="/images/logo.png" alt="MEDA Logo" />
        <FooterList>
          {NavLinkList.map((navLink, key) => {
            return (
              <FooterItem key={key}>
                <a
                  onClick={() => {
                    scrollToSection(navLink.path);
                  }}
                >
                  {navLink.title}
                </a>
              </FooterItem>
            );
          })}
        </FooterList>
        <FooterToTop
          onClick={() => {
            scrollToSection('top');
          }}
        >
          Back To Top ↑
        </FooterToTop>
        <FooterText>This is a sample footer.</FooterText>
        <FooterText>
          © {new Date().getFullYear()} MEDA | Designed and Built by{' '}
          <FooterLink href="https://www.briansuruki.com/" target="_blank">
            Brian Suruki
          </FooterLink>
        </FooterText>
      </FooterContainer>
      <WarningFooter>
        This is a mock site for demonstration purposes only.
      </WarningFooter>
    </>
  );
};

export default Footer;
