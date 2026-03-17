import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LuMoveRight } from "react-icons/lu";

export default function CardSearch({ countries, fullStatus }: any) {
  const isLoading = !countries || countries.length === 0;
  const router = useRouter();

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 68 }).map((_, i) => (
          <div
            key={i}
            className="w-56 h-14 border rounded-md flex items-center justify-between px-2 "
          >
            <div className="flex items-center">
              <Skeleton className="h-8 w-8 rounded-full bg-gray-300" />
              <Skeleton className="ml-2 h-3 w-24 bg-gray-300 rounded" />
            </div>
            <Skeleton className="h-4 w-4 bg-gray-300 rounded" />
          </div>
        ))}
      </>
    );
  }
  return (
    <>
      {(fullStatus ? countries : countries.slice(0, 100)).map((c: any) => (
        <div
          className={`w-56 h-14 border rounded-md flex items-center cursor-pointer hover:bg-gray-100 hover:scale-105 transition pr-2 pl-2 justify-between`}
          key={c.code}
          onClick={() => {
            localStorage.setItem("code", c.code.toLowerCase());
            router.push("/detail");
          }}
        >
          <div className={`flex items-center text-wrap`}>
            <Image
              src={c.flag}
              alt={c.name}
              width={48}
              height={48}
              className={`rounded-full w-8 h-8 object-cover`}
            />
            <span className={`ml-2 text-xs text-gray-800`}>{c.name}</span>
          </div>

          <LuMoveRight color="#1253f9" />
        </div>
      ))}
    </>
  );
}
