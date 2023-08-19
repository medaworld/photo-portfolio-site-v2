import { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

const movein = keyframes`
  to {
    cy: 100;
    cx: 100;
  }
`;

const moveup = keyframes`
  to {
    cy: 20;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 55px);
  width: 100%;
  background-color: transparent;
  font-family: 'Montserrat', sans-serif;
`;

const Svg = styled.svg<{ isLinearMovement: boolean }>`
  background-color: transparent;
  width: 200px;
  height: 200px;
  border-radius: ${(props) => (props.isLinearMovement ? '0%' : '0%')};
  animation: ${(props) =>
    props.isLinearMovement
      ? 'none'
      : css`
          ${spin} 3s ease infinite alternate
        `};
`;

const Dot = styled.circle.attrs({
  r: 10,
})<{ isLinearMovement: boolean }>`
  ${(props) => {
    switch (props.id) {
      case 'dot1':
        return css`
          cy: ${props.isLinearMovement ? '150' : '50'};
          cx: ${props.isLinearMovement ? '40' : '50'};
          fill: #888;
          animation: ${props.isLinearMovement
            ? css`
                ${moveup} 2s ease infinite alternate
              `
            : css`
                ${movein} 3s ease infinite alternate
              `};
        `;
      case 'dot2':
        return css`
          cy: ${props.isLinearMovement ? '150' : '50'};
          cx: ${props.isLinearMovement ? '80' : '150'};
          fill: #666;
          animation: ${props.isLinearMovement
            ? css`
                ${moveup} 2s ease 0.5s infinite alternate
              `
            : css`
                ${movein} 3s ease infinite alternate
              `};
        `;
      case 'dot3':
        return css`
          cy: ${props.isLinearMovement ? '150' : '150'};
          cx: ${props.isLinearMovement ? '120' : '50'};
          fill: #555;
          animation: ${props.isLinearMovement
            ? css`
                ${moveup} 2s ease 1s infinite alternate
              `
            : css`
                ${movein} 3s ease infinite alternate
              `};
        `;
      case 'dot4':
        return css`
          cy: ${props.isLinearMovement ? '150' : '150'};
          cx: ${props.isLinearMovement ? '160' : '150'};
          fill: ${props.theme.primary};
          animation: ${props.isLinearMovement
            ? css`
                ${moveup} 2s ease 1.5s infinite alternate
              `
            : css`
                ${movein} 3s ease infinite alternate
              `};
        `;
      default:
        return '';
    }
  }}
`;

const ControlPanel = styled.div`
  position: fixed;
  bottom: 5px;
  display: flex;
  align-items: center;
`;

const SwitchLabel = styled.p`
  display: inline-block;
  margin: 5px;
`;

const Switch = styled.div`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px;
`;

const Slider = styled.span<{ isChecked: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => (props.isChecked ? '#c20f00' : '#ffdd22')};
  -webkit-transition: 0.4s;
  transition: 0.4s;

  &:before {
    position: absolute;
    content: '';
    height: 19px;
    width: 19px;
    left: 3px;
    bottom: 3px;
    background-color: #000000;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    transform: ${(props) => (props.isChecked ? 'translateX(25px)' : 'none')};
    border-radius: 50%;
  }
`;

export default function LoadingScreen() {
  const [isLinearMovement, setLinearMovement] = useState(false);

  return (
    <Container>
      <Svg isLinearMovement={isLinearMovement}>
        <Dot id="dot1" isLinearMovement={isLinearMovement} />
        <Dot id="dot2" isLinearMovement={isLinearMovement} />
        <Dot id="dot3" isLinearMovement={isLinearMovement} />
        <Dot id="dot4" isLinearMovement={isLinearMovement} />
      </Svg>
    </Container>
  );
}
