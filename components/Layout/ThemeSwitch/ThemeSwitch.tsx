import React, { useContext } from 'react';
import styled from 'styled-components';
import { FiSun, FiMoon } from 'react-icons/fi';
import { ThemeStateContext } from '../../../context/themeState/ThemeStateContext';

const SwitchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  margin-right: 10px;
  color: ${(props) => props.theme.primary};
`;

function ThemeSwitch() {
  const { theme, toggleTheme } = useContext(ThemeStateContext);

  return (
    <SwitchButton onClick={toggleTheme}>
      {theme === 'light' ? <FiSun size={20} /> : <FiMoon size={20} />}
    </SwitchButton>
  );
}

export default ThemeSwitch;
