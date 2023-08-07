import { styled } from 'styled-components';
import { useCallback, useContext, useEffect, useState } from 'react';
import { slideshowImages } from '../utils/dummyData';
import Slideshow from '../components/Slideshow/Slideshow';
import { isMobileDevice, preventTouchMove } from '../utils/scrollTouchUtils';
import WorkContent from '../components/Work/Work';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { firestore } from '../lib/firebase';
import { GlobalStateContext } from '../context/globalState/GlobalStateContext';

const MainContentContainer = styled.div<{ showMain: boolean }>`
  background-color: white;
  margin-top: 150vh;
`;

export default function Home({ categories }) {
  const { showMain, setShowMain } = useContext(GlobalStateContext);

  // Disable Scroll during transitions
  const [canScroll, setCanScroll] = useState(true);

  const forceScrollToTop = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  const enableScrollingAfterDelay = () => {
    setTimeout(() => {
      setCanScroll(true);
    }, 1200);
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
      const currentScrollPosition = window.scrollY;
      const touch = event.changedTouches[0];
      const endY = touch.clientY;
      const endTime = Date.now();
      const deltaY = endY - startY;
      const deltaTime = endTime - startTime;
      const velocity = deltaY / deltaTime;

      if (velocity > 1.5 && currentScrollPosition === 0) {
        // Swiped down
        setShowMain(false);
      } else if (velocity < -0.2 || window.scrollY > 0) {
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
  }, [setShowMain, showMain, startTime, startY]);

  // Set main content style changes
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (showMain) {
      setTimeout(() => {
        mainContent.style.marginTop = '0';
      }, 100);
    } else {
      setTimeout(() => {
        mainContent.style.marginTop = '150vh';
        mainContent.style.transition = 'margin-top 1s ease';
      }, 100);
    }
  }, [showMain]);

  const list = categories.map((category) => {
    return {
      image: category.coverImg,
      option: {
        name: category.category,
        path: `/work/${category.category_lower}`,
      },
    };
  });

  return (
    <>
      <Slideshow images={slideshowImages} />
      <MainContentContainer id="main-content" showMain={showMain}>
        <WorkContent list={list} />
      </MainContentContainer>
    </>
  );
}

export async function getStaticProps() {
  try {
    const categoriesCollection = query(
      collection(firestore, 'categories'),
      orderBy('category', 'asc')
    );
    const querySnapshot = await getDocs(categoriesCollection);

    const categories = querySnapshot.docs.map((doc) => ({
      category: doc.data().category,
      category_lower: doc.data().category_lower,
      id: doc.data().id,
      coverImg: doc.data().coverImg,
    }));

    return {
      props: { categories },
      revalidate: 60,
    };
  } catch (err) {
    console.error('Failed to fetch categories:', err);
    return {
      props: { error: 'Failed to load categories, please try again later.' },
      revalidate: 60,
    };
  }
}
