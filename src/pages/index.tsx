import { useEffect, useState } from "react";
import { GetStaticProps, NextPage } from "next";
import { Articles } from "@/types";
import useHotNews from "@/lib/useHotNews";
import newsAPI, { getNews } from "@/constants/newsAPI";
import useCategory from "@/lib/useCategory";
import NewsCardLg from "@/components/NewsCardLg";
import NewsCardXl from "@/components/NewsCardXl";
import NewsCard2xl from "@/components/NewsCard2xl";
import formatDate from "@/constants/formatDate";
import useStaticData from "@/lib/useStaticData";

interface HomeProps {
  data: {
    articles: Articles;
    latest: Articles;
    popular: Articles;
    relevant: Articles;
  };
  error: boolean;
}

const Home: NextPage<HomeProps> = ({ data, error }) => {
  const [datas, setDatas] = useState<Articles>([]);
  const { hotNewsDispatch } = useHotNews();
  const { setCategory } = useCategory();
  const { getDataFromLocalStorage, setToLocalStorage } = useStaticData()


  useEffect(() => {
    if (!error) {
      const { articles, latest, popular, relevant } = data;
      setDatas(articles);
      hotNewsDispatch({ type: "SET_HOTNEWS", payload: { latest, popular, relevant } });
      setToLocalStorage(data);
    } else {
      const { articles, relevant, msg, popular,latest } = getDataFromLocalStorage();
      alert(msg);
      setDatas(articles);
      hotNewsDispatch({ type: "SET_HOTNEWS", payload: { latest, popular, relevant } });
    }
    setCategory("Indonesia");
  }, []);

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
            {datas.length > 1 &&
              datas
                .slice(1, 3)
                .map((news, i) => <NewsCardLg key={i} news={news} />)}
          </div>
        </div>
        <div className="sm:w-2/3 md:w-auto lg:flex-[2]">
          {datas.length && <NewsCard2xl news={datas[0]} />}
        </div>
      </div>
      <div className="mt-7 space-y-6">
        {datas.length > 3 &&
          datas.slice(3).map((news, i) => <NewsCardXl key={i} news={news} />)}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const useStaticData = {
    props: {
      data: {
        articles: [],
        latest: [],
        popular: [],
        relevant: [],
      },
      error: true,
    },
    revalidate: 86400, // 1 day
  };

  try {
    const data: any = await getNews(newsAPI().topHeadlines({ country: "id" }));
    const latest: any = await getNews(newsAPI().everything({ q: "indonesia", sortBy: "publishedAt" }));
    const popular: any = await getNews(newsAPI().everything({ q: "indonesia", sortBy: "popularity" }));
    const relevant: any = await getNews(newsAPI().everything({ q: "indonesia", sortBy: "relevancy" }));

    if (data.status === "error") return useStaticData;

    return {
      props: {
        data: {
          articles: data?.articles || [],
          latest: latest?.articles || [],
          popular: popular?.articles || [],
          relevant: relevant?.articles || [],
        },
      },
      revalidate: 86400, // 1 day
    };
  } catch (error) {
    return useStaticData;
  }
};

export default Home;
