import { styled } from 'styled-components';

export const LogoContainer = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

export const LogoImage = styled.img`
  width: 30px;
`;

interface LogoPropTypes {
  src: string;
  alt: string;
  href?: string;
}

const Logo = ({ src, alt, href }: LogoPropTypes) => {
  return (
    <LogoContainer>
      <LogoImage src={src} alt={alt} />
    </LogoContainer>
  );
};

export default Logo;
