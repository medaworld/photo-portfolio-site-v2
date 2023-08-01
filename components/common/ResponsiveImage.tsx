import { styled } from 'styled-components';

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ResponsiveImage = ({ src, alt }) => (
  <ImageWrapper>
    <Image src={src} alt={alt} />
  </ImageWrapper>
);

export default ResponsiveImage;
