import { Key, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import React from 'react';
import Image from 'next/image';
import Breadcrumb from '../common/Breadcrumb';
import CustomModal from '../common/CustomModal';

const Container = styled.div`
  min-height: 100vh;
  padding: 0 1.5rem;
  padding-top: 55px;
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
    cursor: pointer;
    transition: opacity 0.2s ease;
    &:hover {
      opacity: 0.5;
    }
  }
`;

export const ModalImageContainer = styled.div`
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;

  img {
    display: flex;
    object-fit: contain;
    max-width: 75vw;
    max-height: 75vh;
    width: auto;
    height: auto;
  }
`;

export default function AlbumImageGrid({ gridItems, crumbData }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState(
    Array(gridItems.length).fill(false)
  );

  useEffect(() => {
    gridItems.forEach((item: any, index: Key) => {
      const img = new window.Image();
      img.src = item.url;
      img.onload = () => {
        setLoadedImages((prevLoadedImages) => {
          const newLoadedImages = [...prevLoadedImages];
          newLoadedImages[index] = true;
          return newLoadedImages;
        });
      };
    });
  }, [gridItems]);

  function closeModal() {
    setModalImage(null);
    setModalIsOpen(false);
  }

  function viewHandler(image: any) {
    setModalImage(image);
    setModalIsOpen(true);
  }

  let breadcrumbs = [{ name: 'Work', url: '/work' }];

  if (crumbData) {
    breadcrumbs = breadcrumbs.concat(crumbData);
  }

  return (
    <Container>
      {crumbData && <Breadcrumb paths={breadcrumbs} />}
      <GridContainer>
        {gridItems.map((item, index: Key) => (
          <ImageContainer
            loaded={loadedImages[index]}
            key={index}
            onClick={() => viewHandler(item.url)}
          >
            <Image
              src={item.url}
              alt={item.id || 'Photo'}
              className={'image'}
              width={item.width || 400}
              height={item.height || 400}
            />
          </ImageContainer>
        ))}
      </GridContainer>
      <CustomModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
        {modalImage && (
          <ModalImageContainer>
            <Image
              src={modalImage}
              alt={''}
              width={500}
              height={500}
              className={'image'}
            />
          </ModalImageContainer>
        )}
      </CustomModal>
    </Container>
  );
}
