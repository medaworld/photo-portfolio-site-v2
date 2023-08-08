import { styled } from 'styled-components';

export const AdminLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 55px);
  padding: 55px 0;
  background-color: ${(props) => props.theme.background};
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 15px;
`;

export const LoginInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.formBorder};
  font-size: 16px;
`;

export const LoginButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: ${(props) => props.theme.dark};
  color: ${(props) => props.theme.background};
  cursor: pointer;
  font-size: 16px;
`;

export const ErrorText = styled.p`
  color: red;
`;
