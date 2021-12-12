import { useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Articles, News } from "@/types";
import useHotNews from "@/lib/useHotNews";
import useCategory from "@/lib/useCategory";
import NewsCardXl from "@/components/NewsCardXl";
import newsAPI, { getNews } from "@/config/newsAPI";

interface SearchProps {
  error?: boolean;
  data: {
    articles: Articles;
    latest: Articles;
    popular: Articles;
    relevant: Articles;
  }
}

const Search: NextPage<SearchProps> = ({ data, error }) => {
  const { hotNewsDispatch } = useHotNews();
  const { setCategory } = useCategory();
  const router = useRouter()

  useEffect(() => {
    if (!error) {
      const { latest, popular, relevant } = data;
      hotNewsDispatch({ type: "SET_HOTNEWS", payload: { latest, popular, relevant } });
      setCategory(router.query.slug);
    }
  }, [router]);

  return (
    <div className="mt-7 space-y-6">
      {data.articles.map((news: News, i: number) => (
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
        data: {
          articles: data?.articles || [],
          latest: latest?.articles || [],
          popular: popular?.articles || [],
          relevant: relevant?.articles || [],
        }
      } 
    };
  } catch (error) {
    return {
      props: {
        error:true,
        data: {
          articles: [],
          latest: [],
          popular: [],
          relevant: [],
        }
      },
    };
  }
};
