"use client";
import GeoMap from "@/common/geoMap/GeoMap";
import Navbar from "@/common/navbar/Navbar";
import CountUp from "react-countup";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import CardCountryHome from "@/common/cardCountryHome/CardCountryHome";

export default function HomePage() {
  const [showMap, setShowMap] = useState(false);
  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMap(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f8f8fa]">
      <Navbar
        home="text-white bg-black hover:bg-black/70 hover:scale-110 transition"
        search="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
        detail="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
        filter="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
        about="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
      />

      <div className="w-full min-h-screen pr-7 pl-7 flex gap-4 items-center">
        <motion.div
          className="w-2/6 flex flex-col justify-center gap-4"
          initial={{ x: -800 }}
          animate={{ x: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h1 className="text-4xl font-semibold leading-tight">
            Explore Countries Around the World
          </h1>

          <p className="text-gray-600 text-sm leading-relaxed">
            Find and explore detailed information about countries across the
            globe. Search any country and instantly view key information such as
            capital city, population, language, and currency.
          </p>

          <span className="text-gray-500 text-sm">
            Start exploring and discover the world one country at a time.
          </span>

          <div className="flex gap-6 pt-10">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                <CountUp end={250} duration={6} />+
              </p>
              <p className="text-xs text-gray-400">Countries</p>
            </div>

            <div className="w-px bg-gray-200" />

            <div>
              <p className="text-2xl font-bold text-gray-900">
                <CountUp end={7} duration={6} />
                B+
              </p>
              <p className="text-xs text-gray-400">Population</p>
            </div>

            <div className="w-px bg-gray-200" />

            <div>
              <p className="text-2xl font-bold text-gray-900">
                <CountUp end={7000} duration={6} />+
              </p>
              <p className="text-xs text-gray-400">Languages</p>
            </div>
          </div>
        </motion.div>

        {showMap && <GeoMap setActiveCountry={setActiveCountry} />}
      </div>

      <CardCountryHome activeCountry={activeCountry} />
    </div>
  );
}
