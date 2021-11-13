import { createContext } from "react";
import type { AppProps } from "next/app";
import { Articles } from "@/types";
import { useLoadingState } from "@/hooks/useLoading";
import { useSavedNewsState } from "@/hooks/useSavedNews";
import { useHotNewsReducer } from "@/hooks/useHotNews";
import { useCategoryState } from "@/hooks/useCategory";
import Loading from "@/components/Loading";
import Layout from "@/components/Layout";
import "tailwindcss/tailwind.css";
import "@/style/loading.css";
import "@/style/global.css";

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
  const [isLoading, setLoading] = useLoadingState();

  const state = { hotNewsState, savedNews, isSaved, isLoading, category };
  const dispatch = { hotNewsDispatch, setLoading, toggleNews, setCategory };

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
