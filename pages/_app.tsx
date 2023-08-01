import { StyleSheetManager, ThemeProvider } from 'styled-components';
import GlobalStyle from '../components/styles/GlobalStyle';
import { theme } from '../themes/theme';
import isPropValid from '@emotion/is-prop-valid';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';

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
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </StyleSheetManager>
    </>
  );
}

export default MyApp;
