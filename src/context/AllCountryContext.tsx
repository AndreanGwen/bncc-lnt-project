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

type AllCountryContextTyoe = {
  countries: Country[];
  loading: boolean;
};

const AllCountryContext = createContext<AllCountryContextTyoe | null>(null);

export function AllCountryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [countriesAll, setCountriesAll] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCountriesAll() {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,capital,languages,flags,population,cca3,coatOfArms"
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

        setCountriesAll(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCountriesAll();
  }, []);

  return (
    <AllCountryContext.Provider value={{ countries: countriesAll, loading }}>
      {children}
    </AllCountryContext.Provider>
  );
}

export function useCountriesAll() {
  const context = useContext(AllCountryContext);

  if (!context) {
    throw new Error("useCountries must be used inside CountryProvider");
  }

  return context;
}
