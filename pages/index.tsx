import { styled } from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { slideshowImages } from '../utils/dummyData';
import Slideshow from '../components/Slideshow/Slideshow';
import { isMobileDevice, preventTouchMove } from '../utils/scrollTouchUtils';

const MainContentContainer = styled.div<{ showMain: boolean }>`
  background-color: white;
  margin-top: 130vh;
  height: 100vh;
  padding: 1rem;
  padding-top: 55px;
  z-index: 2;
  transition: margin-top 1s ease;
`;

export default function Home() {
  // Disable Scroll during transitions
  const [showMain, setShowMain] = useState(false);
  const [canScroll, setCanScroll] = useState(true);

  const forceScrollToTop = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  const enableScrollingAfterDelay = () => {
    setTimeout(() => {
      setCanScroll(true);
    }, 1000);
  };

  useEffect(() => {
    if (showMain) {
      setCanScroll(false);
      window.addEventListener('scroll', forceScrollToTop);
      enableScrollingAfterDelay();
    }

    return () => {
      window.removeEventListener('scroll', forceScrollToTop);
    };
  }, [forceScrollToTop, showMain]);

  useEffect(() => {
    if (canScroll) {
      window.removeEventListener('scroll', forceScrollToTop);
      window.removeEventListener('touchmove', preventTouchMove);
    } else if (!canScroll) {
      window.addEventListener('touchmove', preventTouchMove, {
        passive: false,
      });
    }

    return () => {
      window.removeEventListener('touchmove', preventTouchMove);
    };
  }, [canScroll, forceScrollToTop]);

  // Scroll and Touch Handlers for Main Content Slide

  const [startY, setStartY] = useState(null);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    let lastScrollPosition = window.scrollY;
    let lastTime = Date.now();

    const handleScroll = (event: any) => {
      const currentTime = Date.now();
      const currentScrollPosition = window.scrollY;
      const deltaPosition = currentScrollPosition - lastScrollPosition;
      const deltaTime = currentTime - lastTime;
      const velocity = deltaPosition / deltaTime;

      if (Math.abs(velocity) > 0.5 && currentScrollPosition === 0) {
        setShowMain(false);
      } else if (window.scrollY > 0) {
        setShowMain(true);
      }

      lastScrollPosition = currentScrollPosition;
      lastTime = currentTime;
    };

    const onTouchStart = (event: any) => {
      const touch = event.touches[0];
      setStartY(touch.clientY);
      setStartTime(Date.now());
    };

    const onTouchEnd = (event: any) => {
      const touch = event.changedTouches[0];
      const endY = touch.clientY;
      const endTime = Date.now();
      const deltaY = endY - startY;
      const deltaTime = endTime - startTime;
      const velocity = deltaY / deltaTime;

      if (velocity > 1.5) {
        // Swiped down
        setShowMain(false);
      } else if (velocity < -0) {
        // Swiped up
        setShowMain(true);
      }
    };

    const isMobile = isMobileDevice();

    if (isMobile) {
      window.addEventListener('touchstart', onTouchStart);
      window.addEventListener('touchend', onTouchEnd);
    } else {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (isMobile) {
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchend', onTouchEnd);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [showMain, startTime, startY]);

  // Set main content style changes
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (showMain) {
      setTimeout(() => {
        mainContent.style.marginTop = '0';
      }, 100);
    } else {
      setTimeout(() => {
        mainContent.style.marginTop = '130vh';
      }, 100);
    }
  }, [showMain]);

  return (
    <>
      <Slideshow images={slideshowImages} showMain={showMain} />
      <Layout showMain={showMain}>
        <MainContentContainer showMain={showMain} id="main-content">
          <div style={{ marginTop: '30px' }}>Hello</div>
        </MainContentContainer>
      </Layout>
    </>
  );
}
