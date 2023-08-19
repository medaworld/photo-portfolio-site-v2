import { Key, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import React from 'react';
import Image from 'next/image';
import Breadcrumb from '../common/Breadcrumb';
import Link from 'next/link';
import { size } from '../../utils/breakpoints';

const Container = styled.div`
  padding: 0 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const GridContainer = styled.div`
  column-count: 2;
  -webkit-column-count: 2;
  -moz-column-count: 2;
  column-gap: 50px;
  -webkit-column-gap: 10px;
  column-width: 50%;
  padding: 30px 0;
`;

const ImageContainer = styled.div<{ loaded: boolean }>`
  width: 100%;
  opacity: ${(props) => (props.loaded ? '1' : '0')};
  transition: opacity 1s ease;
  position: relative;

  .image {
    object-fit: contain;
    width: 100% !important;
    position: relative !important;
    height: unset !important;
  }
`;

export const CoverTitle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 40px;
  background-color: black;
  font-family: 'Raleway';
  font-weight: 100;
  color: #fff;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 1;
  overflow: hidden;

  &:hover {
    opacity: 50%;
  }

  @media (max-width: ${size.tablet}) {
    font-size: 20px;
  }
`;

export default function ImageGrid({ gridItems, crumbData }) {
  const [loadedImages, setLoadedImages] = useState(
    Array(gridItems.length).fill(false)
  );

  useEffect(() => {
    gridItems.forEach((item: any, index: Key) => {
      const img = new window.Image();
      img.src = item.cover;
      img.onload = () => {
        setLoadedImages((prevLoadedImages) => {
          const newLoadedImages = [...prevLoadedImages];
          newLoadedImages[index] = true;
          return newLoadedImages;
        });
      };
    });
  }, [gridItems]);

  let breadcrumbs = [{ name: 'Work', url: '/work' }];

  if (crumbData) {
    breadcrumbs = breadcrumbs.concat(crumbData);
  }

  return (
    <>
      {crumbData && <Breadcrumb paths={breadcrumbs} />}
      <Container>
        <GridContainer>
          {gridItems.map((item, index: Key) => (
            <Link key={index} href={item.path}>
              <ImageContainer loaded={loadedImages[index]}>
                <CoverTitle>{item.title}</CoverTitle>
                <Image
                  src={item.cover}
                  alt={item.title || 'image description'}
                  className={'image'}
                  width={item.width || 400}
                  height={item.height || 400}
                />
              </ImageContainer>
            </Link>
          ))}
        </GridContainer>
      </Container>
    </>
  );
}
