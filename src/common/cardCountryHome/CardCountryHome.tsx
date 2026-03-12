import Image from "next/image";
import { motion } from "motion/react";
import { useCountriesHome } from "@/context/CountryContextHome";
import { useEffect } from "react";
import { LiaMonumentSolid } from "react-icons/lia";
import { LuFlag } from "react-icons/lu";
import { AiOutlineUser } from "react-icons/ai";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CardCountryHome({ activeCountry }: any) {
  const router = useRouter();

  const { countries, loading } = useCountriesHome();
  useEffect(() => {
    if (!activeCountry || !countries.length) return;

    const country = countries.find((c) => c.code === activeCountry);
    if (!country) return;

    const element = document.getElementById(country.name.toLowerCase());

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeCountry, countries]);

  return (
    <div className="min-h-fit w-full px-7">
      <div className="flex pt-20 w-full gap-16 items-start">
        {loading ? (
          <div className={`flex flex-wrap gap-4`}>
            {Array.from({ length: 9 }).map((_, i) => (
              <Card key={i} className="w-52 h-72">
                <CardContent>
                  <Skeleton className="aspect-video w-full bg-gray-300 h-28" />
                </CardContent>
                <CardHeader>
                  <Skeleton className="h-4 w-2/3 bg-gray-300" />
                  <Skeleton className="h-4 w-1/2 bg-gray-300" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <motion.div
            className="flex flex-wrap gap-5"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {countries.map((c) => (
              <div
                key={c.code}
                id={c.name.toLowerCase()}
                className={`w-52 h-72 bg-white rounded-2xl shadow-md p-3 cursor-pointer
            transition-all duration-300 hover:scale-105
            ${
              activeCountry === c.code
                ? "grayscale-0 ring-2 ring-blue-500 scale-105"
                : "grayscale hover:grayscale-0"
            }`}
              >
                <Image
                  src={c.flag}
                  alt={`Image of ${c.name}`}
                  width={300}
                  height={200}
                  className="w-full h-28 object-cover rounded-xl"
                />

                <h2 className="text-lg font-semibold pt-3">{c.name}</h2>

                <div className="flex justify-between text-sm pt-4">
                  <div className="flex flex-col gap-1 text-gray-500">
                    <p className="flex items-center gap-1 ">
                      <LiaMonumentSolid />
                      Capital
                    </p>
                    <p className="flex items-center gap-1">
                      <LuFlag />
                      Language
                    </p>
                    <p className="flex items-center gap-1">
                      <AiOutlineUser />
                      Population
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 text-right font-medium truncate">
                    <p>{c.capital}</p>
                    <p>{c.language}</p>
                    <p>{c.population}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        <motion.div
          className="max-w-md flex flex-col gap-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1 className="text-3xl font-semibold leading-snug">
            Journey Through A Symphony of Exploration
          </h1>

          <p className="text-gray-500 leading-relaxed text-sm">
            Explore the world in a new and interactive way. Search and discover
            countries from every corner of the globe while accessing essential
            information such as capital cities, spoken languages, population
            statistics, and more.
          </p>

          <p className="text-gray-500 leading-relaxed text-sm">
            Designed to make global exploration simple and engaging, this
            platform helps you quickly understand the identity and
            characteristics of each nation. Whether you're studying geography,
            building knowledge, or simply curious about the world, everything
            you need is just a search away.
          </p>

          <p className="pb-6 text-gray-500 leading-relaxed text-sm">
            Begin exploring and experience the world one country at a time.
          </p>

          <Button
            className={`w-2/4 cursor-pointer`}
            onClick={() => router.push("/search")}
          >
            Search Country
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
