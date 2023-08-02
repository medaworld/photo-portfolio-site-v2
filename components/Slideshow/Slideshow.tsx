import { styled } from 'styled-components';
import Logo from '../common/Logo';
import { DarkOverShadow } from '../common/DarkOverShadow';
import ImageCarousel from '../ImageCarousel/ImageCarousel';

const SlideshowContainer = styled.div<{ showMain: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  align-items: center;
  text-align: center;
  visibility: ${({ showMain }) => (showMain ? 'hidden' : 'initial')};
  transition: visibility 1s ease;
`;

const SlideshowText = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  font-size: 28px;
  font-family: 'Raleway';
  font-weight: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.light};
  z-index: 2;
  pointer-events: none;

  p {
    margin-left: 10px;
  }

  @media (max-width: 768px) {
    height: 80vh;
  }
`;

export default function Slideshow({ images, showMain }) {
  return (
    <SlideshowContainer showMain={showMain}>
      <SlideshowText>
        <Logo
          src={'/images/logo.png'}
          alt={'Logo'}
          color={'#f0f0f0'}
          size="35px"
        />
        <p>Photography</p>
      </SlideshowText>
      <DarkOverShadow />
      <ImageCarousel images={images} />
    </SlideshowContainer>
  );
}
