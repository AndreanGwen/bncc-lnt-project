"use client";
import CardCountryDetail from "@/common/cardCountrDetail/CardCountryDetail";
import CardCountryDetail_2 from "@/common/cardCountryDetail_2/CardCountryDetail_2";
import Navbar from "@/common/navbar/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailPage() {
  const [data, setData] = useState<any>(null);
  const router = useRouter();
  useEffect(() => {
    const code = localStorage.getItem("code");
    if (!code) {
      alert("Find your Country first!");
      router.push("/search");
      return;
    }
    try {
      axios.get(`https://restcountries.com/v3.1/alpha/${code}`).then((res) => {
        setData(res.data[0]);
      });
    } catch (error) {}
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`w-full min-h-screen flex flex-col bg-[#f8f8fa]`}>
      <Navbar
        home="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
        search="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
        detail="text-white bg-black hover:bg-black/70 hover:scale-110 transition"
        filter="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
        about="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
      />

      <div className="flex flex-col pr-7 pl-7 justify-center">
        <div className={`flex flex-col gap-1.5 pt-36`}>
          <h4 className={`text-blue-700 font-semibold`}>
            {data?.region.toUpperCase()} &bull; {data?.subregion.toUpperCase()}
          </h4>
          <h1 className={`text-6xl font-bold`}>{data?.name?.common}</h1>
          <p className={`text-md font-semibold text-black/50`}>
            {data?.altSpellings[1]}
          </p>
        </div>

        <div className="w-full pt-8 flex gap-6 items-stretch flex-wrap">
          <div className="w-72 p-3 rounded-2xl border shadow flex flex-col justify-between">
            {data?.flags?.svg && (
              <Image
                src={data.flags.svg}
                alt="country-flag"
                width={300}
                height={200}
                className="w-full h-40 rounded-xl object-cover"
              />
            )}

            <div className="pt-3 flex items-start gap-3 px-2">
              <span className="text-lg">{data?.flag}</span>
              <span className="text-xs text-gray-600 leading-snug">
                {data?.flags?.alt}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-1">
            <CardCountryDetail data={data} />
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-20">
          <div className="text-sm tracking-widest font-semibold">
            Country Details
          </div>

          <div className="grid grid-cols-4  gap-2 justify-between">
            <CardCountryDetail_2 data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
