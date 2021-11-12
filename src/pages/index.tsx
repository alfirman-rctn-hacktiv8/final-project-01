import NewsCardLg from "@/components/NewsCardLg";
import NewsCardXl from "@/components/NewsCardXl";
import NewsCard2xl from "@/components/NewsCard2xl";
import { GetServerSideProps } from "next";
import { Articles } from "@/types";
import newsAPI from "@/constants/newsAPI";

interface HomeProps {
  articles: Articles;
}

const Home = ({ articles }: HomeProps) => {
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
                .map((news, i) => (
                  <NewsCardLg key={i} category="Indonesia" news={news} />
                ))}
          </div>
        </div>
        <div className="sm:w-2/3 md:w-auto lg:flex-[2]">
          {articles.length && (
            <NewsCard2xl category="Indonesia" news={articles[0]} />
          )}
        </div>
      </div>
      <div className="mt-7 space-y-6">
        {articles.length > 3 &&
          articles
            .slice(3)
            .map((news, i) => (
              <NewsCardXl key={i} category="Indonesia" news={news} />
            ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch(
      newsAPI().everything({ q: "indonesia", language: "id" })
    );

    const { articles } = await res.json();

    return { props: { articles } };
  } catch (error) {
    return { props: { articles: [] } }; // static data
  }
};

export default Home;
