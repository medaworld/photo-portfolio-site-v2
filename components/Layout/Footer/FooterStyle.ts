import { styled } from 'styled-components';

export const FooterContainer = styled.footer`
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.border};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  z-index: 5;
`;

export const FooterList = styled.ul`
  display: flex;
  list-style: none;
  font-family: 'Raleway', sans-serif;
  text-transform: uppercase;
  padding: 0;
  margin: 1rem 0;
`;

export const FooterItem = styled.li`
  margin-right: 15px;
  font-size: 14px;

  &:last-child {
    margin-right: 0;
  }

  a {
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      opacity: 0.7;
    }
  }

  @media (max-width: 1024px) {
    font-size: 14px;
  }
`;

export const FooterToTop = styled.a`
  margin: 0 0 1rem 0;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;

  &:hover {
    opacity: 0.7;
  }
`;

export const FooterText = styled.p`
  text-align: center;
  font-size: 10px;
  margin: 0;
`;

export const FooterLink = styled.a`
  text-decoration: underline;

  &:hover {
    opacity: 0.7;
  }
`;

export const WarningFooter = styled.div`
  padding: 0.75rem 1.25rem;
  color: #856404;
  background-color: #fff3cd;
  border-color: #ffeeba;
`;
