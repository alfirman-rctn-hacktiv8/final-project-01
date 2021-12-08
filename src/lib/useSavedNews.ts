import { useContext, useState } from "react";
import { GlobalState } from "@/pages/_app";
import { Articles, News } from "@/types";

export function useSavedNewsState() {
  const [savedNews, setSavedNews] = useState<Articles>([]);

  const saveNews = (news: News) => setSavedNews((crr: Articles) => [...crr, news]);

  const removeNews = (news: News) => {
    const filtered = savedNews.filter((crrNews: News) => crrNews.url !== news.url);
    setSavedNews(filtered);
  };

  const isSaved = (news: News): boolean => {
    const isExist: boolean = savedNews.some((crrNews: News) => crrNews.url === news.url);
    return isExist;
  };

  const toggleNews = (news: News) => !isSaved(news) ? saveNews(news) : removeNews(news);

  return [savedNews, toggleNews, isSaved];
}

export default function useSavedNews() {
  const { state, dispatch } = useContext(GlobalState);
  const { savedNews, isSaved } = state;
  const { toggleNews } = dispatch;
  return { savedNews, toggleNews, isSaved };
}
