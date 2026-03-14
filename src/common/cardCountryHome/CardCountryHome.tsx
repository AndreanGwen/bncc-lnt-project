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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiLanguage } from "react-icons/hi2";

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
      <div className="flex flex-col lg:flex-row pt-20 w-full gap-12 items-start">
        {loading ? (
          <div className={`flex flex-wrap gap-4`}>
            {Array.from({ length: 9 }).map((_, i) => (
              <Card key={i} className="md:w-52 md:h-72 w-40 h-60">
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
            className="md:flex flex-wrap md:gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 flex-1"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {countries.map((c, idx) => (
              <Dialog key={idx}>
                <form>
                  <DialogTrigger asChild>
                    <div
                      key={c.code}
                      id={c.name.toLowerCase()}
                      className={`w-full md:w-52 md:h-72  bg-white rounded-2xl shadow-md p-3 cursor-pointer
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
                        className="w-full md:h-28 h-20 object-cover rounded-xl"
                      />

                      <h2 className="text-lg font-semibold pt-3">{c.name}</h2>

                      <div className="flex justify-between text-sm pt-4">
                        <div className="flex flex-col gap-1 text-gray-500 text-xs md:text-sm">
                          <p className="flex items-center gap-1 ">
                            <LiaMonumentSolid />
                            Capital
                          </p>
                          <p className="flex items-center gap-1">
                            <HiLanguage />
                            Language
                          </p>
                          <p className="flex items-center gap-1">
                            <AiOutlineUser />
                            Population
                          </p>
                        </div>

                        <div className="flex flex-col gap-1 text-right font-medium truncate text-xs md:text-sm">
                          <p>{c.capital}</p>
                          <p>{c.language}</p>
                          <p className="truncate">{c.population}</p>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className={`text-xl`}>{c.name}</DialogTitle>
                      <DialogDescription asChild>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm pt-4">
                          <p className="flex items-center gap-1 text-gray-500">
                            <LiaMonumentSolid />
                            Capital
                          </p>
                          <p className="font-medium text-right">{c.capital}</p>

                          <p className="flex items-center gap-1 text-gray-500">
                            <HiLanguage />
                            Language
                          </p>
                          <p className="font-medium text-right">{c.language}</p>

                          <p className="flex items-center gap-1 text-gray-500">
                            <AiOutlineUser />
                            Population
                          </p>
                          <p className="font-medium text-right">
                            {c.population}
                          </p>

                          <p className="flex items-center gap-1 text-gray-500">
                            <LuFlag />
                            Flag
                          </p>
                          <p className="font-medium text-right">
                            {c.flagDetail}
                          </p>

                          <p className="flex items-center gap-1 text-gray-500">
                            Coat of Arms
                          </p>

                          <div className="flex justify-end">
                            <Image
                              alt="coat of arms"
                              width={80}
                              height={80}
                              src={c.coatOfArms}
                              className="object-contain"
                            />
                          </div>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </form>
              </Dialog>
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
