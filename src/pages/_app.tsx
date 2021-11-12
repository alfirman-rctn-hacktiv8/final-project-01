import { createContext } from "react";
import type { AppProps } from "next/app";
import { newsReducer } from "@/hooks/useHotNews";
import Layout from "@/components/Layout";
import "tailwindcss/tailwind.css";
import "@/style/global.css";

export const GlobalState = createContext<any>({});

function MyApp({ Component, pageProps }: AppProps) {
  const [newsState, newsDispatch] = newsReducer();

  const state = {
    newsState,
  };

  const dispatch = {
    newsDispatch,
  };

  return (
    <GlobalState.Provider value={{ state, dispatch }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalState.Provider>
  );
}

export default MyApp;
