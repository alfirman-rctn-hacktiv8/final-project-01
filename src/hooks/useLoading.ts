import { useContext, useState } from "react";
import { GlobalState } from "@/pages/_app";

export function useLoadingState(): [boolean, Function] {
  const [isLoading, setLoading] = useState<boolean>(false);
  return [isLoading, setLoading];
}

export default function useLoading() {
  const { state, dispatch } = useContext(GlobalState);
  const { isLoading } = state;
  const { setLoading } = dispatch;
  return { isLoading, setLoading };
}
