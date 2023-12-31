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
import { NavLinkList } from '../../../utils/dummyData';
import SocialMediaIcon from '../../common/SocialMediaIcon';
import Link from 'next/link';

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
        <FooterList>
          {NavLinkList.map((navLink, key) => {
            return (
              <FooterItem key={key}>
                <Link href={navLink.path}>{navLink.title}</Link>
              </FooterItem>
            );
          })}
        </FooterList>
        <SocialMediaIcon
          href={'https://www.instagram.com/meda.world'}
          size={20}
          platform={'instagram'}
          margin={'0 0 15px 0'}
        />
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
        This is a site for demonstration purposes only.
      </WarningFooter>
    </>
  );
};

export default Footer;
