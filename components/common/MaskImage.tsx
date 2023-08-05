import { styled } from 'styled-components';

const MaskImageContainer = styled.div<{ width: string }>`
  display: flex;
  align-items: center;
  width: ${({ width }) => width};
`;

const MaskedImage = styled.div<{
  img: string;
  width: string;
  color: string;
}>`
  background-color: ${({ color }) => color};
  width: ${({ width }) => width};
  padding-top: 100%;
  mask-image: url(${({ img }) => img});
  -webkit-mask-image: url(${({ img }) => img});
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  transition: right 0.5s ease;
`;

const MaskImage = ({
  src,
  width,
  color,
}: {
  src: string;
  width: string;
  color: string;
}) => {
  return (
    <MaskImageContainer width={width}>
      <MaskedImage img={src} width={width} color={color} />
    </MaskImageContainer>
  );
};

export default MaskImage;
