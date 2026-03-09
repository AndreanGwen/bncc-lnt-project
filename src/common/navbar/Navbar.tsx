import { FaGlobeAmericas } from "react-icons/fa";

export default function Navbar({ home, search, detail, filter, about }: any) {
  return (
    <div className={`w-full h-20 flex justify-between items-center pr-7 pl-7`}>
      <a className={`flex items-center gap-2 w-fit h-fit`} href={`/`}>
        <div
          className={`h-10 w-10 bg-black flex justify-center items-center rounded-full`}
        >
          <FaGlobeAmericas color={`#ffffff`} size={30} />
        </div>
        <h1 className={`font-bold text-[18px]`}>World University</h1>
      </a>

      <div
        className={`bg-white flex gap-2 pt-1 pb-1 pr-2 pl-2 w-fit h-fit rounded-full shadow`}
      >
        <a
          href="/"
          className={`${home} text-white w-20 h-10 flex justify-center items-center rounded-full`}
        >
          Home
        </a>
        <a
          href="/"
          className={`${search} w-20 h-10 flex justify-center items-center rounded-full`}
        >
          Search
        </a>
        <a
          href="/"
          className={`${detail} w-20 h-10 flex justify-center items-center rounded-full`}
        >
          Detail
        </a>
        <a
          href="/"
          className={`${filter} w-20 h-10 flex justify-center items-center rounded-full`}
        >
          Filter
        </a>
        <a
          href="/"
          className={`${about} w-20 h-10 flex justify-center items-center rounded-full`}
        >
          About
        </a>
      </div>
    </div>
  );
}
