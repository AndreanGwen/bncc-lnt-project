"use client";
import Navbar from "@/common/navbar/Navbar";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useCountriesAll } from "@/context/AllCountryContext";
import CardSearch from "@/common/cardSearch/CardSearch";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SearchPage() {
  const { countries, loading } = useCountriesAll();
  const [full, setFull] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCountries = countries?.filter((c: any) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className={`w-full min-h-screen bg-[#f8f8fa]`}>
      <Navbar
        home="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
        search="text-white bg-black hover:bg-black/70 hover:scale-110 transition"
        detail="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
        filter="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
        about="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
      />

      <div
        className={`w-full md:min-h-screen md:pr-7 md:pl-7 flex items-center pt-24 flex-col`}
      >
        <div className={`w-3/4 pb-10`}>
          <Field className="w-full">
            <Input
              type="text"
              placeholder="Search Country Here"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Field>
        </div>

        <div className={`w-full flex flex-wrap justify-center gap-4`}>
          <CardSearch countries={filteredCountries} fullStatus={full} />
        </div>

        <Button
          className={`bottom-10 rounded-full fixed cursor-pointer bg-blue-700 hover:scale-105 transition`}
          onClick={() => setFull(!full)}
        >
          {full ? "Show less country" : "Show more country"}
        </Button>
      </div>
    </div>
  );
}
