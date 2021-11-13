import useSavedNews from "@/hooks/useSavedNews";
import { News } from "@/types";

const Saved = () => {
  const { savedNews, toggleNews } = useSavedNews();
  return (
    <>
      <h1 className="text-3xl font-bold oswald border-green-300 border-b-4 py-4 uppercase text-gray-800">
        saved
      </h1>
      <div className="overflow-auto">
        <div className="w-[640px] sm:w-full">
          <table className="w-full mt-4">
            <thead className="text-left font-bold oswald text-lg sm:text-2xl tracking-wide">
              <tr className="border-b-2 border-gray-600">
                <th className="p-3 w-[14rem]">Source</th>
                <th className="p-3 w-[14rem]">Title</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="text-sm sm:text-base">
              {savedNews.length &&
                savedNews.map((news: News, i: number) => (
                  <tr key={i} className="odd:bg-gray-100">
                    <td className="p-3 w-[14rem] space-y-2">
                      <p>{news.source.name}</p>
                      <div className="flex items-center space-x-3">
                        <a
                          href={news.url}
                          className="text-blue-600 hover:underline"
                        >
                          News Page
                        </a>
                        <button
                          onClick={() => toggleNews(news)}
                          className="text-blue-600 hover:underline"
                        >
                          Unsave
                        </button>
                      </div>
                    </td>
                    <td className="p-3 w-[14rem] ">{news.title}</td>
                    <td className="p-3">{news.description}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Saved;
