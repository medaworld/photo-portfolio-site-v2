import Link from 'next/link';
import { styled } from 'styled-components';
import device from '../../utils/breakpoints';

export const CoverContainer = styled.div`
  position: relative;
  transition: all 0.3s ease;
`;

export const CoverTitle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 40px;
  font-family: Poppins;
  background-color: black;
  color: ${(p) => p.theme.dark};
  opacity: 0%;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;

  &:hover {
    opacity: 50%;
  }

  @media ${device.mobileS} {
    font-size: 20px;
  }
  @media ${device.laptop} {
    font-size: 40px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export default function OverlayTextImage({
  src,
  alt,
  category,
  url,
}: {
  src: string;
  alt: string;
  category: string;
  url: string;
}) {
  return (
    <CoverContainer>
      <Link href={url} scroll={false}>
        <CoverTitle>{category}</CoverTitle>
        <Image src={src} alt={alt} />
      </Link>
    </CoverContainer>
  );
}
