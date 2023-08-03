import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import ResponsiveImage from '../common/ResponsiveImage';
import OverlayTextImage from '../OverlayTextImage/OverlayTextImage';

const GridContainer = styled.div`
  column-count: 2;
  -webkit-column-count: 2;
  -moz-column-count: 2;
  column-gap: 50px;
  -webkit-column-gap: 10px;
  column-width: 50%;
  padding: 1rem;
`;

export default function ImageGrid({ sections }) {
  const [currentSection, setCurrentSection] = useState(0);

  // Handle scrolling to update the current section
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const sectionIndex = Math.floor(scrollY / window.innerHeight);
      setCurrentSection(sectionIndex);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const images = sections[3] || [];

  return (
    <GridContainer>
      {images.map((image, index) => (
        <OverlayTextImage
          key={index}
          src={image}
          alt={''}
          category={'A'}
          url={''}
        />
      ))}
    </GridContainer>
  );
}
