import Link from "next/link";

interface SideBarProps {
  isSideBar: boolean;
  setSideBar: Function;
}

export default function SideBar({ isSideBar, setSideBar }: SideBarProps) {
  return (
    <>
      <div
        onClick={() => setSideBar(false)}
        className={`bg-black/50 h-screen w-full fixed top-0 left-0 z-50 overflow-auto ${
          !isSideBar && "hidden"
        }`}
      ></div>
      <nav
        className={`${
          !isSideBar ? "-translate-x-full" : "translate-x-0"
        } min-h-full h-screen w-11/12 fixed top-0 left-0 z-50 overflow-auto transform duration-500`}
      >
        <ul className="h-full bg-black space-y-3 flex flex-col justify-center items-center">
          {navs.map((nav, i) => (
            <li
              key={i}
              className="text-gray-300 hover:text-white text-2xl lg:text-4xl uppercase"
            >
              <Link href={nav.link}>
                <a onClick={() => setSideBar(false)}>{nav.text}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
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
