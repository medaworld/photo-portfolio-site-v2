import React, { Key } from 'react';
import Slider from 'react-slick';
import { styled } from 'styled-components';

const ImageCarouselContainer = styled.div`
  .fullscreen-slider {
    width: 100%;
    height: 100vh;
    margin-bottom: 1rem;
    overflow: hidden;
  }
`;

const Slide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: default;
`;

const ImageCarousel = ({ images }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  interface SlideProps {
    src: string;
    position?: string;
  }

  return (
    <ImageCarouselContainer>
      <Slider {...settings} className="fullscreen-slider">
        {images.map((image: SlideProps, index: Key) => (
          <Slide key={index}>
            <SlideImage
              src={image.src}
              alt={`slide-${index}`}
              style={{
                objectPosition: image.position ? image.position : 'default',
              }}
            />
          </Slide>
        ))}
      </Slider>
    </ImageCarouselContainer>
  );
};

export default ImageCarousel;
