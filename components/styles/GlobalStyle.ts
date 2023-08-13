import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.primary};
  }


  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
  }

  main {
    margin: 0 auto;
    padding: 0;
  }

  a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
    body {
      /* color: ${(props) => props.theme.light};
      background: ${(props) => props.theme.dark}; */
    }
  }
`;

export default GlobalStyle;
