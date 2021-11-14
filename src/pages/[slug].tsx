import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { News } from "@/types";
import useCategory from "@/hooks/useCategory";
import formatDate from "@/constants/formatDate";
import SocialMediaDetailNews from "@/components/SocialMediaDetailNews";

const NewsDetail: NextPage = () => {
  const { category } = useCategory();
  const router = useRouter();
  const slug: any = router.query.slug;
  const [news, setNews] = useState<News>();

  useEffect(() => {
    if (slug) {
      const item: any = localStorage.getItem(
        slug.split(" ").join("").toLowerCase()
      );
      setNews(JSON.parse(item));
    }
  }, [slug]);
  return (
    <>
      <h5 className="my-5">
        <span className="oswald uppercase text-lg px-3 bg-[#FF005B] text-white skew-x-[-15deg] font-extrabold inline-block">
          {category || "general"}
        </span>
      </h5>
      <h1 className="oswald font-bold text-3xl xs:text-5xl text-gray-900">
        {news?.title}
      </h1>
      <p className="text-lg font-semibold text-gray-500 my-5">
        {news?.description}
      </p>
      <div className="flex items-center space-x-3">
        <div className="rounded-full h-16 w-16 border-2 bg-yellow-400"></div>
        <div className="text-sm font-semibold text-gray-500">
          <p>Published at {formatDate(news?.publishedAt)}</p>
          <p>
            By{" "}
            <b className="text-gray-900 font-bold">
              {news?.author || "Anonymous"}
            </b>
          </p>
        </div>
      </div>
      <div className="h-[350px] sm:h-[492px] w-full my-5 relative">
        {/* <Image
          alt="random-pic"
          layout="fill"
          objectFit="cover"
          src="https://mvpthemes.com/zoxnews/wp-content/uploads/2017/07/vr-headset.jpg"
        /> */}
        <img
          src={news?.urlToImage || ""}
          alt={news?.urlToImage || ""}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="xs:flex space-x-3 my-5">
        <div className="flex-1">
          <div className="xs:sticky top-20">
            <SocialMediaDetailNews />
          </div>
        </div>
        <div className="flex-[9] mt-3 xs:mt-0">
          <p className="text-gray-700 font-semibold text-lg whitespace-pre-wrap">
            {news?.content + "\n\n" + paragraph}
          </p>
        </div>
      </div>
    </>
  );
};

export default NewsDetail;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { slug } = context?.params;

//   const keyword = slug.split(" ").join("+");

//   console.log(newsAPI().everything({ q: keyword }));

//   const res = await fetch(newsAPI().everything({ q: keyword }));

//   const { articles } = await res.json();

//   return { props: { news: articles[0] } };
// };

const paragraph =
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNeque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.\n\nAt vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.\n\nHeading 1\n\nQuis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.\n\nTemporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.\n\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
