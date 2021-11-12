import { createContext } from "react";
import type { AppProps } from "next/app";
import { hotNewsReducer } from "@/hooks/useHotNews";
import Layout from "@/components/Layout";
import "tailwindcss/tailwind.css";
import "@/style/global.css";

interface GlobalState {
  state: { hotNewsState: {} };
  dispatch: { hotNewsDispatch: Function };
}

export const GlobalState: any = createContext<Partial<GlobalState>>({});

function MyApp({ Component, pageProps }: AppProps) {
  const [hotNewsState, hotNewsDispatch] = hotNewsReducer();

  const state = {
    hotNewsState,
  };

  const dispatch = {
    hotNewsDispatch,
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
