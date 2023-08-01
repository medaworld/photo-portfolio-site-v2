import { styled } from 'styled-components';
import ResponsiveImage from '../components/common/ResponsiveImage';

const Container = styled.div`
  width: 100%;
`;

const ImageWrapper = styled.div`
  width: 50%;
`;

export default function Home() {
  return (
    <Container>
      <h1>Title</h1>
      <p>Hello!</p>
      <ImageWrapper>
        <ResponsiveImage src={'/images/sample.jpg'} alt={'My photo'} />
      </ImageWrapper>
    </Container>
  );
}
