import { FaGlobeAmericas } from "react-icons/fa";
import { motion } from "motion/react";

export default function Navbar({ home, search, detail, filter, about }: any) {
  return (
    <motion.div
      className={`w-full h-20 flex justify-between items-center pr-7 pl-7 fixed z-10 backdrop-blur-xs border-b`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
    >
      <a className={`flex items-center gap-2 w-fit h-fit`} href={`/`}>
        <div
          className={`h-9 w-9 bg-black flex justify-center items-center rounded-full`}
        >
          <FaGlobeAmericas color={`#ffffff`} size={25} />
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
          href="/search"
          className={`${search} w-20 h-10 flex justify-center items-center rounded-full`}
        >
          Search
        </a>
        <a
          href="/detail"
          className={`${detail} w-20 h-10 flex justify-center items-center rounded-full`}
        >
          Detail
        </a>
        <a
          href="/filter"
          className={`${filter} w-20 h-10 flex justify-center items-center rounded-full`}
        >
          Filter
        </a>
        <a
          href="/about"
          className={`${about} w-20 h-10 flex justify-center items-center rounded-full`}
        >
          About
        </a>
      </div>
    </motion.div>
  );
}
