import { createContext } from "react";
import type { AppProps } from "next/app";
import { Router } from "next/router";
import NProgress from "nprogress";
import { Articles } from "@/types";
import { useSavedNewsState } from "@/lib/useSavedNews";
import { useHotNewsReducer } from "@/lib/useHotNews";
import { useCategoryState } from "@/lib/useCategory";
import Layout from "@/components/Layout";
import "tailwindcss/tailwind.css";
import "@/style/nprogress.css";

interface GlobalState {
  state: {
    savedNews: Articles;
    isSaved: boolean;
    isLoading: boolean;
    hotNewsState: Object;
  };
  dispatch: {
    hotNewsDispatch: Function;
    setLoading: Function;
    toggleNews: Function;
  };
}

export const GlobalState: any = createContext<Partial<GlobalState>>({});

function MyApp({ Component, pageProps }: AppProps) {
  const [hotNewsState, hotNewsDispatch] = useHotNewsReducer();
  const [savedNews, toggleNews, isSaved] = useSavedNewsState();
  const [category, setCategory] = useCategoryState();

  const state = { hotNewsState, savedNews, isSaved, category };
  const dispatch = { hotNewsDispatch, toggleNews, setCategory };

  return (
    <GlobalState.Provider value={{ state, dispatch }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalState.Provider>
  );
}

export default MyApp;

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
