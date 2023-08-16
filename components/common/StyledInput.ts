import styled from 'styled-components';

const inputVariants = {
  primary: {
    backgroundColor: 'white',
    color: 'black',
  },
  transparent: {
    backgroundColor: 'transparent',
    color: 'white',
  },
};

const getInputStyles = (variant?: string) => {
  const styles = inputVariants[variant] || inputVariants.primary;
  return `
      background-color: ${styles.backgroundColor};
      color: ${styles.color};
  
      &:hover {
          background-color: ${styles.hoverBackgroundColor};
      }
    `;
};

const StyledInput = styled.input<{ variant: string }>`
  padding: 5px;
  border-radius: 5px;
  font-family: 'Open sans';
  border: 1px solid ${(props) => props.theme.primary};
  ${(props) => getInputStyles(props.variant)}
`;

export default StyledInput;
