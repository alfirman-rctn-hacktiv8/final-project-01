import { useContext, useReducer } from "react";
import { GlobalState } from "@/pages/_app";
import { Articles } from "@/types";

interface InitialState {
  latest: Articles;
  relevant: Articles;
  popular: Articles;
}

interface HotNews {
  latest: Articles;
  relevant: Articles;
  popular: Articles;
  hotNewsDispatch: any;
}

const initialState: InitialState = { latest: [], relevant: [], popular: [] };

const reducer = (state: InitialState, action: any): InitialState => {
  if (action.type === "SET_HOTNEWS") {
    const { relevant, latest, popular } = action.payload;
    return { relevant, latest, popular };
  }
  return state;
};

export const useHotNewsReducer = () => {
  const [hotNewsState, hotNewsDispatch] = useReducer(reducer, initialState);
  return [hotNewsState, hotNewsDispatch];
};

export default function useHotNews() {
  const { state, dispatch } = useContext(GlobalState);
  const hotNews: HotNews = {
    latest: state.hotNewsState.latest,
    popular: state.hotNewsState.popular,
    relevant: state.hotNewsState.relevant,
    hotNewsDispatch: dispatch.hotNewsDispatch,
  };
  return hotNews;
}
