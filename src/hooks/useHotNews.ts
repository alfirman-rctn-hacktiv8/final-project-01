import { useContext, useReducer } from "react";
import { GlobalState } from "@/pages/_app";
import { Articles } from "@/types";

interface InitialState {
  latest: Articles;
  relevant: Articles;
  popular: Articles;
  category: String;
}

interface Action {
  type: "SET_LATEST" | "SET_RELEVANT" | "SET_POPULAR" | "SET_CATEGORY";
  payload: Articles | string | any;
}

interface HotNews {
  latest: Articles;
  relevant: Articles;
  popular: Articles;
  category: String;
  hotNewsDispatch: InitialState | string | any;
}

const initialState: InitialState = {
  latest: [],
  relevant: [],
  popular: [],
  category: "",
};

const reducer = (state: InitialState, action: Action): InitialState => {
  switch (action.type) {
    case "SET_LATEST":
      return { ...state, latest: action.payload };
    case "SET_RELEVANT":
      return { ...state, relevant: action.payload };
    case "SET_POPULAR":
      return { ...state, popular: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    default:
      return state;
  }
};

export const useHotNewsReducer = () => {
  const [hotNewsState, hotNewsDispatch] = useReducer<any>(
    reducer,
    initialState
  );
  return [hotNewsState, hotNewsDispatch];
};

export default function useHotNews() {
  const { state, dispatch } = useContext(GlobalState);
  const hotNews: HotNews = {
    latest: state.hotNewsState.latest,
    popular: state.hotNewsState.popular,
    relevant: state.hotNewsState.relevant,
    category: state.hotNewsState.category,
    hotNewsDispatch: dispatch.hotNewsDispatch,
  };
  return hotNews;
}
