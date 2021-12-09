import { useEffect } from "react";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { Articles } from "@/types";
import useHotNews from "@/lib/useHotNews";
import useCategory from "@/lib/useCategory";
import newsAPI, { getNews } from "@/constants/newsAPI";
import NewsCardLg from "@/components/NewsCardLg";
import NewsCardXl from "@/components/NewsCardXl";
import NewsCard2xl from "@/components/NewsCard2xl";
import staticData from "@/data/indonesia.json";

interface CategoryProps {
  msg?: string;
  articles: Articles;
  hotNews: {
    latest: Articles;
    popular: Articles;
    relevant: Articles;
  };
}

const Category: NextPage<CategoryProps> = ({ articles, hotNews, msg }) => {
  const router = useRouter()
  const { hotNewsDispatch } = useHotNews();
  const { setCategory } = useCategory();

  useEffect(() => {
    if (msg) alert(msg);
    const { latest, popular, relevant } = hotNews;
    hotNewsDispatch({ type: "SET_RELEVANT", payload: relevant });
    hotNewsDispatch({ type: "SET_POPULAR", payload: popular });
    hotNewsDispatch({ type: "SET_LATEST", payload: latest });
    setCategory(router.query.slug);
  }, [router]);

  return (
    <>
      <div className="flex flex-col-reverse sm:flex-row md:flex-col-reverse lg:flex-row sm:space-x-4 md:space-x-0 lg:space-x-6">
        <div className="sm:w-1/3 md:w-auto lg:flex-1 relative mt-5 lg:mt-0">
          <h5 className="flex justify-center absolute top-0 w-full">
            <span className="oswald uppercase text-lg px-3 bg-[#FF005B] text-white skew-x-[-15deg] font-extrabold">
              Indonesia
            </span>
          </h5>
          <div className="flex sm:flex-col md:flex-row lg:flex-col border-t border-black mt-3 pt-7 space-x-2 sm:space-x-0 sm:space-y-6 md:space-y-0 lg:space-y-7 md:space-x-5 lg:space-x-0">
            {articles.length > 1 &&
              articles
                .slice(1, 3)
                .map((news, i) => <NewsCardLg key={i} news={news} />)}
          </div>
        </div>
        <div className="sm:w-2/3 md:w-auto lg:flex-[2]">
          {articles.length && <NewsCard2xl news={articles[0]} />}
        </div>
      </div>
      <div className="mt-7 space-y-6">
        {articles.length > 3 &&
          articles
            .slice(3)
            .map((news, i) => <NewsCardXl key={i} news={news} />)}
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = ["hiburan","kesehatan","politik","bisnis","koruptor","teknologi","seleb","agama"];

  const data = await Promise.all(categories.map((el) => getNews(newsAPI().everything({ q: el, language: "id" }))));

  const paths = data.map((el, i) => ({ params: { slug: categories[i] } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
  const slug: any = ctx.params?.slug;
  const useStaticData = {
    props: {
      msg: "error, API's not working on deployment or APi request has reached the limit\nNow you're using static data at november 14 2021",
      articles: staticData.data,
      hotNews: {
        latest: staticData.latest,
        popular: staticData.popular,
        relevant: staticData.relevant,
      },
    },
    revalidate: 86400, // 1 day
  };

  try {
    const data: any = await getNews(newsAPI().everything({ q: slug }));
    const latest: any = await getNews(newsAPI().everything({ q: slug, sortBy: "publishedAt" }));
    const popular: any = await getNews(newsAPI().everything({ q: slug, sortBy: "popularity" }));
    const relevant: any = await getNews(newsAPI().everything({ q: slug, sortBy: "relevancy" }));

    if (data.status === "error") return useStaticData;

    return {
      props: {
        articles: data?.articles || [],
        hotNews: {
          latest: latest?.articles || [],
          popular: popular?.articles || [],
          relevant: relevant?.articles || [],
        },
      },
      revalidate: 86400, // 1 day
    };
  } catch (error) { return useStaticData }
};

export default Category;
