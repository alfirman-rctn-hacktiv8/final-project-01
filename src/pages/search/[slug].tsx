import { useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps, NextPage } from "next";
import { Articles, News } from "@/types";
import useHotNews from "@/hooks/useHotNews";
import NewsCardXl from "@/components/NewsCardXl";
import newsAPI from "@/constants/newsAPI";

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
  const slug: string | any = useRouter().query.slug;

  useEffect(() => {
    if (msg) alert(msg);
    const { latest, popular, relevant } = hotNews;
    hotNewsDispatch({ type: "SET_LATEST", payload: latest });
    hotNewsDispatch({ type: "SET_RELEVANT", payload: relevant });
    hotNewsDispatch({ type: "SET_POPULAR", payload: popular });
    hotNewsDispatch({ type: "SET_CATEGORY", payload: slug });
  }, []);

  return (
    <div className="mt-7 space-y-6">
      {articles.map((news: News, i: number) => (
        <NewsCardXl key={i} news={news} category={slug || "search"} />
      ))}
    </div>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug: string | any = ctx.params?.slug;
  const keyword = slug.split(" ").join("+").toLowerCase();
  try {
    const resData = await fetch(
      newsAPI().everything({ q: keyword, qInTitle: keyword })
    );
    const resLatest = await fetch(
      newsAPI().everything({
        q: keyword,
        sortBy: "publishedAt",
      })
    );
    const resPopular = await fetch(
      newsAPI().everything({
        q: keyword,
        sortBy: "popularity",
      })
    );
    const resRelevant = await fetch(
      newsAPI().everything({
        q: keyword,
        sortBy: "relevancy",
      })
    );

    const latest = await resLatest.json();
    const popular = await resPopular.json();
    const relevant = await resRelevant.json();
    const data = await resData.json();

    const props = {
      articles: data?.articles || [],
      hotNews: {
        latest: latest?.articles || [],
        popular: popular?.articles || [],
        relevant: relevant?.articles || [],
      },
    };

    return { props };
  } catch (error) {
    return {
      props: {
        msg: "data not found",
        articles: [],
        hotNews: {
          latest: [],
          popular: [],
          relevant: [],
        },
      },
    }; // static data
  }
};
