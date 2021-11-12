import { useContext, useReducer } from "react";
import { GlobalState } from "@/pages/_app";

const initialState = {
  latest: [],
  relevant: [],
  popular: [],
  category: "",
};

const reducer = (state: any, action: any) => {
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

export const newsReducer = () => {
  const [newsState, newsDispatch] = useReducer(reducer, initialState);
  return [newsState, newsDispatch];
};

export default function useHotNews() {
  const { state, dispatch } = useContext(GlobalState);
  return {
    latest: state.newsState.latest,
    popular: state.newsState.popular,
    relevant: state.newsState.relevant,
    category: state.newsState.category,
    newsDispatch: dispatch.newsDispatch,
  };
}
