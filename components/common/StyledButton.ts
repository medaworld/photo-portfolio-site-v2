import styled from 'styled-components';

const buttonVariants = {
  primary: {
    backgroundColor: '#0070f3',
    color: 'white',
    hoverBackgroundColor: '#0051a2',
  },
  error: {
    backgroundColor: '#e00',
    color: 'white',
    hoverBackgroundColor: '#a00',
  },
  secondary: {
    backgroundColor: '#ccc',
    color: 'black',
    hoverBackgroundColor: '#aaa',
  },
  neutral: {
    backgroundColor: '#407095',
    color: 'white',
    hoverBackgroundColor: '#0c4673',
  },
};

const getButtonStyles = (variant) => {
  const styles = buttonVariants[variant] || buttonVariants.primary;
  return `
      background-color: ${styles.backgroundColor};
      color: ${styles.color};
  
      &:hover {
          background-color: ${styles.hoverBackgroundColor};
      }
    `;
};

const StyledButton = styled.button<{ variant: string }>`
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 5px 15px;
  transition: background-color 0.3s;
  margin: 1rem 0;
  ${(props) => getButtonStyles(props.variant)}
`;

export default StyledButton;
