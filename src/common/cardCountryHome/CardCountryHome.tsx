import Image from "next/image";
import { motion } from "motion/react";
import { useCountriesHome } from "@/context/CountryContextHome";
import { useEffect } from "react";

export default function CardCountryHome({ activeCountry }: any) {
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
    <div className="min-h-screen w-full pr-7 pl-7">
      <div className="flex pt-20 w-11/12 justify-between">
        {loading ? (
          <>Loading</>
        ) : (
          <motion.div
            className={`flex flex-wrap gap-4`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {countries.map((c, i) => (
              <div
                key={c.code}
                id={c.name.toLowerCase()}
                className={`w-52 h-72 bg-white rounded-2xl shadow p-2 grayscale hover:grayscale-0 transition duration-300 cursor-pointer ${
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
                  className={`w-full h-28 object-cover rounded-xl `}
                />
                <h2>{c.name}</h2>
                <p>{c.capital}</p>
                <p>{c.language}</p>
                <p>{c.population}</p>
              </div>
            ))}
          </motion.div>
        )}
        <motion.div
          className={``}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1 className={`text-center text-2xl font-semibold`}>
            Journey Through A Symphony of Exploration
          </h1>
        </motion.div>
      </div>
    </div>
  );
}
