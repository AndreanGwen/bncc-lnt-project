import CardSearch from "@/common/cardSearch/CardSearch";
import CardSearchFilter from "@/common/cardSearchFilter/CardSearchFilter";
import Navbar from "@/common/navbar/Navbar";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useCountriesAll } from "@/context/AllCountryContext";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchFilter() {
  const { countries, loading } = useCountriesAll();
  const [search, setSearch] = useState("");
  const [full, setFull] = useState(false);

  const filteredCountries = countries?.filter((c: any) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="w-full min-h-screen bg-[#f8f8fa]">
      <Navbar
        home="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
        filter="text-white bg-black hover:bg-black/70 hover:scale-110 transition"
        detail="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
        search="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
        about="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
      />

      <div className="flex gap-4 pt-24 pr-7 pl-7">
        <div className="w-1/4 flex flex-col items-center">
          <Field className="pb-10">
            <Input
              type="text"
              placeholder={`Search Country`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Field>

          <div className="w-full flex flex-wrap gap-2 ">
            <CardSearchFilter countries={filteredCountries} fullStatus={full} />
          </div>

          <Button
            className={`rounded-full fixed bottom-10 text-white px-4 py-2 cursor-pointer bg-black hover:scale-105 transition`}
            onClick={() => setFull(!full)}
          >
            {full ? "Show less country" : "Show more country"}
          </Button>
        </div>

        <div className="flex-1 bg-amber-100">
          <span>Filter Your Country</span>
        </div>
      </div>
    </div>
  );
}
