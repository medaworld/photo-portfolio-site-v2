import { StyleSheetManager, ThemeProvider } from 'styled-components';
import GlobalStyle from '../components/styles/GlobalStyle';
import { theme } from '../themes/theme';
import isPropValid from '@emotion/is-prop-valid';
import Head from 'next/head';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ShowMainProvider } from '../components/contexts/ShowMainContext';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Artist | Photography</title>
        <meta name="description" content="Official website for MEDA" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <StyleSheetManager shouldForwardProp={isPropValid}>
        <ShowMainProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Component {...pageProps} />
          </ThemeProvider>
        </ShowMainProvider>
      </StyleSheetManager>
    </>
  );
}

export default MyApp;
