import formatDate from "@/constants/formatDate";
import { Articles } from "@/types";
import { useRouter } from "next/router";

interface Data {
  articles: Articles;
  latest: Articles;
  popular: Articles;
  relevant: Articles;
}

export default function useStaticData() {
  const router: any = useRouter();

  const setToLocalStorage = (data:Data) => {
    const key = router.query?.slug || "Indonesia"
    const { articles, latest, relevant, popular } = data;
    const event = new Date(Date.now());
    const date = event.toISOString();
    const result = { date, articles, latest, relevant, popular };
    localStorage.setItem(key, JSON.stringify(result));
  };

  const getDataFromLocalStorage = () => {
    const key = router.query?.slug || "Indonesia"
    const data: any = localStorage.getItem(key);
    const parsed = JSON.parse(data);
    const { date, articles, latest, relevant, popular } = parsed;
    const msg = `API's not working on deployment or API request has reached the limit\nNow you're using static data on ${formatDate(date)}`;
    return { msg, articles, latest, relevant, popular };
  };

  return { setToLocalStorage, getDataFromLocalStorage }
}
