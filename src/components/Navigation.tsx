import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { MenuIcon, SearchIcon } from "./icon";

export default function Navigation({ setSideBar }: { setSideBar: Function }) {
  const { push } = useRouter();
  const [input, setInput] = useState<string>("");

  const search = (e: FormEvent) => {
    e.preventDefault();
    push(`/search/${input}`);
  };

  return (
    <nav className="bg-white sticky top-0 z-20 shadow-lg py-2 lg:py-0">
      <div className="w-11/12 mx-auto flex items-center">
        <button
          onClick={() => setSideBar((crr: boolean) => !crr)}
          className="flex-1 h-full flex items-center"
        >
          <MenuIcon />
        </button>
        <ul className="flex-[3] hidden lg:flex items-center justify-center space-x-6">
          {navs.map((nav, i) => (
            <li key={i}>
              <Link href={nav.link}>
                <a className="uppercase pt-3 pb-1 block text-gray-600 border-b-4 border-transparent hover:border-green-300 oswald">
                  {nav.text}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex-1 h-full flex items-center justify-end">
          <form onSubmit={(e) => search(e)} className="inline-block relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="search"
              className="border rounded-xl px-3 w-40 text-sm"
            />
            <div className="absolute right-2 top-0 h-full flex items-center">
              <SearchIcon />
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
}

const navs = [
  {
    text: "indonesia",
    link: "/",
  },
  {
    text: "programming",
    link: "/programming",
  },
  {
    text: "covid19",
    link: "/covid19",
  },
  {
    text: "entertainment",
    link: "/entertainment",
  },
  {
    text: "politics",
    link: "/politics",
  },
  {
    text: "tech",
    link: "/tech",
  },
  {
    text: "saved",
    link: "/saved",
  },
];
