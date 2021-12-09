import { useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Articles, News } from "@/types";
import useHotNews from "@/lib/useHotNews";
import useCategory from "@/lib/useCategory";
import newsAPI, { getNews } from "@/constants/newsAPI";
import NewsCardXl from "@/components/NewsCardXl";

interface SearchProps {
  msg: string;
  articles: Articles;
  hotNews: {
    latest: Articles;
    popular: Articles;
    relevant: Articles;
  };
}

const Search: NextPage<SearchProps> = ({ articles, hotNews, msg }) => {
  const { hotNewsDispatch } = useHotNews();
  const { setCategory } = useCategory();
  const router = useRouter()

  useEffect(() => {
    if (msg) alert(msg);
    const { latest, popular, relevant } = hotNews;
    hotNewsDispatch({ type: "SET_LATEST", payload: latest });
    hotNewsDispatch({ type: "SET_RELEVANT", payload: relevant });
    hotNewsDispatch({ type: "SET_POPULAR", payload: popular });
    setCategory(router.query.slug);
  }, [router]);

  return (
    <div className="mt-7 space-y-6">
      {articles.map((news: News, i: number) => (
        <NewsCardXl key={i} news={news} />
      ))}
    </div>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug: string | any = ctx.params?.slug;
  const keyword = slug.split(" ").join("+").toLowerCase();
  try {
    const data: any = await getNews(newsAPI().everything({ q: keyword, qInTitle: keyword }))
    const latest: any = await getNews(newsAPI().everything({ q: keyword, sortBy: "publishedAt" }))
    const popular: any = await getNews(newsAPI().everything({ q: keyword, sortBy: "popularity" }))
    const relevant: any = await getNews(newsAPI().everything({ q: keyword, sortBy: "relevancy" }))

    return { 
      props: {
        articles: data?.articles || [],
        hotNews: {
          latest: latest?.articles || [],
          popular: popular?.articles || [],
          relevant: relevant?.articles || [],
        },
      } 
    };
  } catch (error) {
    return {
      props: {
        msg: "data not found or API is expired",
        articles: [],
        hotNews: {
          latest: [],
          popular: [],
          relevant: [],
        },
      },
    };
  }
};
