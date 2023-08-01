import { styled } from 'styled-components';

const MaskImageContainer = styled.div<{ width: string }>`
  display: flex;
  width: ${({ width }) => width};
`;

const GridIcon = styled.div<{
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
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const MaskImage = ({
  img,
  width,

  color,
}: {
  img: string;
  width: string;

  color: string;
}) => {
  return (
    <MaskImageContainer width={width}>
      <GridIcon img={img} width={width} color={color} />
    </MaskImageContainer>
  );
};

export default MaskImage;
