"use client";
import CardCountryDetail from "@/common/cardCountrDetail/CardCountryDetail";
import CardCountryDetail_2 from "@/common/cardCountryDetail_2/CardCountryDetail_2";
import FooterHome from "@/common/footerHome/FooterHome";
import Navbar from "@/common/navbar/Navbar";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function DetailPage() {
  const [data, setData] = useState<any>(null);
  const [gini, setGini] = useState<number>(0);

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

  useEffect(() => {
    if (data?.gini) {
      const giniValue = Object.values(data.gini)[0] as number;
      setGini(giniValue);
    }
  }, [data]);

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

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="pr-7 pl-7"
      >
        <div className="flex flex-col justify-center">
          <div className={`flex flex-col gap-1.5 md:pt-28 pt-20`}>
            <h4 className={`text-blue-700 font-semibold`}>
              {data?.region.toUpperCase()} &bull; {}
              {data.subregion ? data?.subregion.toUpperCase() : "-"}
            </h4>
            <h1 className={`text-6xl font-bold`}>{data?.name?.common}</h1>
            <p className={`text-md font-semibold text-black/50`}>
              {data?.altSpellings[1]}
            </p>
          </div>

          <div className="w-full pt-8 flex gap-6 items-stretch flex-wrap">
            <div className="md:w-72 p-3 rounded-2xl border shadow flex flex-col justify-between">
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
            <div className="text-sm tracking-widest font-semibold flex justify-center items-center gap-3">
              <span>Country Details</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <div className="grid md:grid-cols-4 grid-cols-1 pt-2 gap-2 justify-between">
              <CardCountryDetail_2 data={data} />
            </div>
          </div>
        </div>

        <div className="pt-10">
          <div className="text-sm tracking-widest font-semibold flex justify-center items-center gap-3">
            <span>Timezones</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          <div className="flex pt-3 gap-3">
            {data?.timezones?.map((timezone: string, index: number) => (
              <div
                key={index}
                className="p-2 border text-xs rounded-xs w-24 h-7 flex items-center justify-center"
              >
                {timezone}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-10">
          <div className="text-sm tracking-widest font-semibold flex justify-center items-center gap-3">
            <span>Bordering Countries</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          <div className="flex pt-3 gap-3 flex-wrap">
            {data?.borders && data.borders.length > 0 ? (
              data.borders.map((border: string, index: number) => (
                <div
                  key={index}
                  className="p-2 border text-xs rounded-xs w-12 h-7 flex items-center justify-center bg-blue-500/10"
                >
                  {border}
                </div>
              ))
            ) : (
              <span className="text-sm text-gray-400">None</span>
            )}
          </div>
        </div>

        <div className="pt-10 pb-10">
          <div className="text-sm tracking-widest font-semibold flex justify-center items-center gap-3 pb-4">
            <span>GINI INDEX</span>
            <div className="flex-1 h-px bg-gray-300"></div>
            <span>{gini}</span>
          </div>
          <Progress value={gini} className="w-full bg-black/20" />
          <span className="text-xs text-black/50">
            Scale 0 (perfect equality) → 100 (perfect inequality)
          </span>
        </div>

        <div className="pb-10">
          <div className="text-sm tracking-widest font-semibold flex justify-center items-center gap-3 pb-4">
            <span>COAT OF ARMS</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          <div className="w-full flex ">
            <Image
              src={data?.coatOfArms?.svg}
              alt="coat-of-arms"
              width={90}
              height={90}
            />
          </div>
        </div>
      </motion.div>
      <FooterHome />
    </div>
  );
}
