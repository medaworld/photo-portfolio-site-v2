import { StyleSheetManager, ThemeProvider } from 'styled-components';
import GlobalStyle from '../components/styles/GlobalStyle';
import isPropValid from '@emotion/is-prop-valid';
import Head from 'next/head';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GlobalStateProvider } from '../context/globalState/GlobalStateProvider';
import Layout from '../components/Layout/Layout';
import { NotificationProvider } from '../context/notification/NotificationProvider';
import { ThemeStateContextProvider } from '../context/themeState/ThemeStateProvider';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Artist | Photography</title>
        <meta name="description" content="Official website for MEDA" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <StyleSheetManager shouldForwardProp={isPropValid}>
        <ThemeStateContextProvider>
          <GlobalStyle />
          <GlobalStateProvider>
            <SessionProvider>
              <NotificationProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </NotificationProvider>
            </SessionProvider>
          </GlobalStateProvider>
        </ThemeStateContextProvider>
      </StyleSheetManager>
    </>
  );
}

export default MyApp;
