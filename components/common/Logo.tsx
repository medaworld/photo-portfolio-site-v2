import { styled } from 'styled-components';
import MaskImage from './MaskImage';

export const LogoContainer = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

interface LogoPropTypes {
  src: string;
  alt: string;
  href?: string;
  size?: string;
  color?: string;
}

const Logo = ({ src, alt, href, size, color }: LogoPropTypes) => {
  return (
    <LogoContainer>
      <MaskImage
        src={src}
        width={size ? size : '30px'}
        color={color ? color : 'black'}
      />
    </LogoContainer>
  );
};

export default Logo;
