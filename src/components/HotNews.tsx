import { useState } from "react";
import { News } from "@/types";
import useHotNews from "@/hooks/useHotNews";
import NewsCardSm from "./NewsCardSm";

type IActiveTab = "latest" | "popular" | "relevant";

export default function HotNews() {
  const hotNews = useHotNews();
  const [activeTab, setActiveTab] = useState<IActiveTab>("latest");
  return (
    <div className="sticky top-16">
      <div className="flex justify-center space-x-px">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(tab)}
            className={`${
              tab === activeTab
                ? "bg-[#FF005B] text-white"
                : "bg-transparent text-gray-400 hover:text-gray-800"
            } oswald rounded-none uppercase text-lg px-3 skew-x-[-15deg] font-extrabold`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="w-full space-y-4 mt-4">
        {hotNews[activeTab] &&
          hotNews[activeTab]
            .slice(0, 4)
            .map((news: News, i: number) => (
              <NewsCardSm key={i} news={news} />
            ))}
      </div>
    </div>
  );
}
const tabs: IActiveTab[] = ["latest", "relevant", "popular"];
