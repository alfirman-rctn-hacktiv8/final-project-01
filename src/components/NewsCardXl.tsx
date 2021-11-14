import { MouseEvent } from "react";
import Link from "next/link";
import { News } from "@/types";
import useCategory from "@/hooks/useCategory";
import formatDate from "@/constants/formatDate";
import useSavedNews from "@/hooks/useSavedNews";
import { BookmarkIcon } from "./icon";

interface NewsCardProps {
  news: News;
}

export default function NewsCardXl({ news }: NewsCardProps) {
  const { toggleNews, isSaved } = useSavedNews();
  const { category } = useCategory();

  const saveOrRemoveNews = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleNews(news);
  };
  return (
    <Link href={`/${news.title}`}>
      <a
        onClick={() => {
          localStorage.setItem(
            news.title.split(" ").join("").toLocaleLowerCase(),
            JSON.stringify(news)
          );
        }}
        className="flex group border-t border-gray-300 pt-3"
      >
        <div className="h-[120px] xs:h-[180px] lg:h-[229px] w-2/5 md:w-1/2 lg:w-1/3 relative bg-black group">
          {/* <Image
          alt="random-pic"
          layout="fill"
          objectFit="cover"
          src="https://mvpthemes.com/zoxnews/wp-content/uploads/2017/07/airplane.jpg"
          className="group-hover:opacity-80 duration-300"
        /> */}
          <img
            src={news?.urlToImage || ""}
            alt={news?.urlToImage?.slice(0, 30) || ""}
            className="h-full w-full object-cover group-hover:opacity-80 duration-300"
          />
          <button
            onClick={(e) => saveOrRemoveNews(e)}
            className="absolute top-2 right-2 h-8 w-8 bg-gray-900/30 rounded-full hidden group-hover:grid place-items-center"
          >
            <BookmarkIcon
              color={isSaved(news) ? "text-yellow-300" : "text-gray-300"}
              size="h-4 w-4"
            />
          </button>
        </div>
        <div className="w-3/5 md:w-1/2 lg:w-2/3 px-4 lg:px-6 text-justify flex flex-col">
          <p className="font-extrabold uppercase text-xs lg:text-sm mb-1 lg:mb-0">
            {category}{" "}
            <span className="font-medium lowercase">
              / {formatDate(news.publishedAt)}
            </span>
          </p>
          <h2 className="oswald font-extrabold xs:text-2xl lg:text-3xl text-gray-800 group-hover:text-gray-600 duration-200">
            {news.title}
          </h2>
          <p className="mt-3 text-gray-500 hidden lg:block">
            {news.description}
          </p>
        </div>
      </a>
    </Link>
  );
}
