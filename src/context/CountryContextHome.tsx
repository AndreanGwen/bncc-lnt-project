"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Country = {
  name: string;
  capital: string;
  flag: string;
  language: string;
  population: string;
  code: string;
  flagDetail: string;
  coatOfArms: string;
};

type CountryContextHomeType = {
  countries: Country[];
  loading: boolean;
};

const CountryContextHome = createContext<CountryContextHomeType | null>(null);

export function CountryHomeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [countriesHome, setCountriesHome] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCountriesHome() {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/alpha?codes=usa,bra,deu,ind,chn,jpn,idn,aus,can"
        );

        const data = await res.json();

        const formatted = data.map((c: any) => ({
          name: c.name.common,
          capital: c.capital?.[0],
          language: c.languages[Object.keys(c.languages)[0]],
          flag: c.flags.svg,
          population: c.population,
          code: c.cca3,
          flagDetail: c.flags.alt,
          coatOfArms: c.coatOfArms.svg,
        }));

        setCountriesHome(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCountriesHome();
  }, []);

  return (
    <CountryContextHome.Provider value={{ countries: countriesHome, loading }}>
      {children}
    </CountryContextHome.Provider>
  );
}

export function useCountriesHome() {
  const context = useContext(CountryContextHome);

  if (!context) {
    throw new Error("useCountries must be used inside CountryProvider");
  }

  return context;
}
