import styled from 'styled-components';

const textAreaVariants = {
  primary: {
    backgroundColor: 'white',
    color: 'black',
  },
  transparent: {
    backgroundColor: 'transparent',
    color: 'white',
  },
};

const getTextAreaStyles = (variant?: string) => {
  const styles = textAreaVariants[variant] || textAreaVariants.primary;
  return `
      background-color: ${styles.backgroundColor};
      color: ${styles.color};
  
      &:hover {
          background-color: ${styles.hoverBackgroundColor};
      }
    `;
};

const StyledTextArea = styled.textarea<{ variant: string }>`
  padding: 5px;
  border-radius: 5px;
  font-family: 'Open sans';
  resize: none;
  height: 60px;
  ${(props) => getTextAreaStyles(props.variant)}
`;

export default StyledTextArea;
