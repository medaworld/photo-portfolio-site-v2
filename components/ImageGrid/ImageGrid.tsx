import { Key, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import OverlayTextImage from '../OverlayTextImage/OverlayTextImage';
import React from 'react';
import Image from 'next/image';

const GridContainer = styled.div`
  min-height: 100vh;
  column-count: 2;
  -webkit-column-count: 2;
  -moz-column-count: 2;
  column-gap: 50px;
  -webkit-column-gap: 10px;
  column-width: 50%;
  padding: 1rem 1.5rem;
`;

const ImageContainer = styled.div<{ loaded: boolean }>`
  width: 100%;
  opacity: ${(props) => (props.loaded ? '1' : '0')};
  transition: opacity 1s ease;

  > div {
    position: unset !important;
  }

  .image {
    object-fit: contain;
    width: 100% !important;
    position: relative !important;
    height: unset !important;
  }
`;

export default function ImageGrid({ sections }) {
  const [loadedImages, setLoadedImages] = useState(
    Array(sections.length).fill(false)
  );

  useEffect(() => {
    sections.forEach((image: string, index: Key) => {
      const img = new window.Image();
      img.src = image;
      img.onload = () => {
        setLoadedImages((prevLoadedImages) => {
          const newLoadedImages = [...prevLoadedImages];
          newLoadedImages[index] = true;
          return newLoadedImages;
        });
      };
    });
  }, [sections]);

  return (
    <GridContainer>
      {sections.map((image, index: Key) => (
        <ImageContainer key={index} loaded={loadedImages[index]}>
          <Image
            src={image} // the image source URL
            alt={image.alt || 'image description'} // alt text
            className={'image'}
            width={image.width || 400}
            height={image.height || 400}
          />
        </ImageContainer>
      ))}
    </GridContainer>
  );
}
