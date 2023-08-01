import { styled } from 'styled-components';
import ResponsiveImage from '../components/common/ResponsiveImage';
import MaskImage from '../components/common/MaskImage';

const Container = styled.div`
  width: 100%;
`;

const ImageWrapper = styled.div`
  width: 50%;
`;

export default function Home() {
  return (
    <Container>
      <ImageWrapper>
        <ResponsiveImage src={'/images/sample.jpg'} alt={'My photo'} />
      </ImageWrapper>
      <h1>Title</h1>
      <p>Hello!</p>
      <MaskImage img={'/images/logo.png'} width={'50px'} color={'green'} />
      <ImageWrapper>
        <ResponsiveImage src={'/images/sample.jpg'} alt={'My photo'} />
      </ImageWrapper>
      <ImageWrapper>
        <ResponsiveImage src={'/images/sample.jpg'} alt={'My photo'} />
      </ImageWrapper>
      <ImageWrapper>
        <ResponsiveImage src={'/images/sample.jpg'} alt={'My photo'} />
      </ImageWrapper>
    </Container>
  );
}
