import { useContext, useState } from "react";
import { GlobalState } from "@/pages/_app";

export function useCategoryState(): [string, Function] {
  const [category, setCategory] = useState<string>("");
  return [category, setCategory];
}

export default function useCategory() {
  const { state, dispatch } = useContext(GlobalState);
  const { category } = state;
  const { setCategory } = dispatch;
  return { category, setCategory };
}
