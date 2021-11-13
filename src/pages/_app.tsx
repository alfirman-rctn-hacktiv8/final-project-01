import { createContext } from "react";
import type { AppProps } from "next/app";
import { loadingState } from "@/hooks/useLoading";
import { hotNewsReducer } from "@/hooks/useHotNews";
import Loading from "@/components/Loading";
import Layout from "@/components/Layout";
import "tailwindcss/tailwind.css";
import "@/style/loading.css";
import "@/style/global.css";

interface GlobalState {
  state: { hotNewsState: {} };
  dispatch: { hotNewsDispatch: Function };
}

export const GlobalState: any = createContext<Partial<GlobalState>>({});

function MyApp({ Component, pageProps }: AppProps) {
  const [hotNewsState, hotNewsDispatch] = hotNewsReducer();
  const [isLoading, setLoading] = loadingState();

  const state = {
    hotNewsState,
    isLoading,
  };

  const dispatch = {
    hotNewsDispatch,
    setLoading,
  };

  return (
    <GlobalState.Provider value={{ state, dispatch }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Loading />
    </GlobalState.Provider>
  );
}

export default MyApp;
