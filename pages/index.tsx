import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { useShowMain } from '../components/contexts/ShowMainContext';
import Layout from '../components/Layout/Layout';
import { slideshowImages } from '../utils/dummyData';
import Slideshow from '../components/Slideshow/Slideshow';

const MainContentContainer = styled.div<{ showMain: boolean }>`
  background-color: white;
  margin-top: ${({ showMain }) => (showMain ? '0' : '100vh')};
  height: 100vh;
  padding: 1rem;
  padding-top: 55px;
  z-index: 3;
  transition: margin-top 1s ease;
`;

export default function Home() {
  const [showMain, setShowMain] = useState(false);
  const [canScroll, setCanScroll] = useState(true);

  // Function to enable scrolling after a delay
  const enableScrollingAfterDelay = () => {
    setTimeout(() => {
      setCanScroll(true);
    }, 1000);
  };

  useEffect(() => {
    if (showMain) {
      setCanScroll(false);
      enableScrollingAfterDelay();
    }
  }, [showMain]);

  useEffect(() => {
    if (canScroll) {
      document.body.classList.remove('no-scroll');
    } else {
      document.body.classList.add('no-scroll');
    }
  }, [canScroll]);

  useEffect(() => {
    let lastScrollPosition = window.scrollY;
    let lastTime = Date.now();

    const handleScroll = (event: any) => {
      const currentTime = Date.now();
      const currentScrollPosition = window.scrollY;
      const deltaPosition = currentScrollPosition - lastScrollPosition;
      const deltaTime = currentTime - lastTime;
      const velocity = deltaPosition / deltaTime;

      if (Math.abs(velocity) > 0.2 && currentScrollPosition === 0) {
        setShowMain(false);
      } else if (window.scrollY > 0) {
        setShowMain(true);
      }

      lastScrollPosition = currentScrollPosition;
      lastTime = currentTime;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showMain]);

  return (
    <>
      <Slideshow images={slideshowImages} showMain={showMain} />
      <Layout showMain={showMain}>
        <MainContentContainer showMain={showMain}>Hello</MainContentContainer>
      </Layout>
    </>
  );
}
