import Image from "next/image";
import { LuMoveRight } from "react-icons/lu";

export default function CardSearchFilter({ countries, fullStatus }: any) {
  return (
    <>
      {(fullStatus ? countries : countries.slice(0, 100)).map((c: any) => (
        <div
          className={`md:w-36 md:h-14 w-[40%] h-14 border rounded-md flex items-center cursor-pointer hover:bg-gray-100 hover:scale-105 transition pr-2 pl-2 justify-between`}
          key={c.code}
          onClick={() => {
            localStorage.setItem("code-filter", c.code.toLowerCase());
          }}
        >
          <div className={`flex items-center text-wrap`}>
            <Image
              src={c.flag}
              alt={c.name}
              width={30}
              height={30}
              className={`rounded-full w-6 h-6 object-cover`}
            />
            <span className={`ml-2 text-[11px] text-gray-800`}>{c.name}</span>
          </div>

          <LuMoveRight color="#1253f9" />
        </div>
      ))}
    </>
  );
}
