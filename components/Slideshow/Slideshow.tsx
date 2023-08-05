import { styled } from 'styled-components';
import Logo from '../common/Logo';
import { DarkOverShadow } from '../common/DarkOverShadow';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import { useCallback, useContext } from 'react';
import { GlobalStateContext } from '../../context/globalState/GlobalStateContext';

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

const SlideshowOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  pointer-events: none;

  @media (max-width: 768px) {
    height: 80vh;
  }
`;

const SlideshowContent = styled.div`
  height: 40px;
  font-size: 28px;
  font-family: 'Raleway';
  font-weight: 100;
  color: ${(props) => props.theme.light};
  display: flex;
  align-items: center;
  pointer-events: visible;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.7;
    transform: scale(1.05);
  }

  p {
    margin-left: 10px;
  }
`;

export default function Slideshow({ images }) {
  const { showMain, setShowMain } = useContext(GlobalStateContext);

  const handleClick = useCallback(() => {
    setShowMain(true);
  }, [setShowMain]);

  return (
    <SlideshowContainer showMain={showMain}>
      <SlideshowOverlay>
        <SlideshowContent onClick={handleClick}>
          <Logo
            src={'/images/logo.png'}
            alt={'Logo'}
            color={'#f0f0f0'}
            size="35px"
          />
          <p>Photography</p>
        </SlideshowContent>
      </SlideshowOverlay>
      <DarkOverShadow />
      <ImageCarousel images={images} />
    </SlideshowContainer>
  );
}
