import CardSearchFilter from "@/common/cardSearchFilter/CardSearchFilter";
import Navbar from "@/common/navbar/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCountriesAll } from "@/context/AllCountryContext";
import { useState, useMemo } from "react";

type SortKey =
  | "name-asc"
  | "name-desc"
  | "pop-asc"
  | "pop-desc"
  | "area-asc"
  | "area-desc";

const REGIONS = [
  "Africa",
  "Americas",
  "Asia",
  "Europe",
  "Oceania",
  "Antarctic",
];

const POPULATION_MARKS = [
  { label: "All", value: Infinity },
  { label: "< 1M", value: 1_000_000 },
  { label: "< 10M", value: 10_000_000 },
  { label: "< 50M", value: 50_000_000 },
  { label: "< 100M", value: 100_000_000 },
  { label: "< 500M", value: 500_000_000 },
];

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: "Name A→Z", value: "name-asc" },
  { label: "Name Z→A", value: "name-desc" },
  { label: "Population ↑", value: "pop-asc" },
  { label: "Population ↓", value: "pop-desc" },
  { label: "Area ↑", value: "area-asc" },
  { label: "Area ↓", value: "area-desc" },
];

function fmt(n: number) {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return n.toString();
}

export default function SearchFilter() {
  const { countries, loading } = useCountriesAll();

  const [search, setSearch] = useState("");
  const [full, setFull] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [maxPop, setMaxPop] = useState<number>(Infinity);
  const [sortKey, setSortKey] = useState<SortKey>("name-asc");
  const [independent, setIndependent] = useState<boolean | null>(null);

  const [mobileTab, setMobileTab] = useState<"countries" | "filters">(
    "countries"
  );

  const activeCount = [
    selectedRegions.length > 0,
    maxPop !== Infinity,
    sortKey !== "name-asc",
    independent !== null,
  ].filter(Boolean).length;

  const filtered = useMemo(() => {
    if (!countries) return [];
    let list = [...countries];

    if (search.trim())
      list = list.filter((c: any) =>
        c.name.common.toLowerCase().includes(search.toLowerCase())
      );

    if (selectedRegions.length > 0)
      list = list.filter((c: any) => selectedRegions.includes(c.region));

    if (maxPop !== Infinity)
      list = list.filter((c: any) => (c.population ?? 0) < maxPop);

    if (independent !== null)
      list = list.filter((c: any) => c.independent === independent);

    list.sort((a: any, b: any) => {
      switch (sortKey) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "pop-asc":
          return (a.population ?? 0) - (b.population ?? 0);
        case "pop-desc":
          return (b.population ?? 0) - (a.population ?? 0);
        case "area-asc":
          return (a.area ?? 0) - (b.area ?? 0);
        case "area-desc":
          return (b.area ?? 0) - (a.area ?? 0);
        default:
          return 0;
      }
    });

    return list;
  }, [countries, search, selectedRegions, maxPop, independent, sortKey]);

  const toggleRegion = (r: string) =>
    setSelectedRegions((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );

  const resetAll = () => {
    setSelectedRegions([]);
    setMaxPop(Infinity);
    setSortKey("name-asc");
    setIndependent(null);
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f8fa]">
      <Navbar
        home="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
        filter="text-white bg-black hover:bg-black/70 hover:scale-110 transition"
        detail="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
        search="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
        about="text-black bg-white hover:bg-black/10 hover:scale-110 transition"
      />

      <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-[#f8f8fa] border-b border-gray-200 flex">
        <button
          onClick={() => setMobileTab("countries")}
          className={`flex-1 py-3 text-sm font-semibold transition border-b-2 ${
            mobileTab === "countries"
              ? "border-black text-black"
              : "border-transparent text-gray-400"
          }`}
        >
          Countries
          <span className="ml-1.5 text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">
            {filtered.length}
          </span>
        </button>
        <button
          onClick={() => setMobileTab("filters")}
          className={`flex-1 py-3 text-sm font-semibold transition border-b-2 ${
            mobileTab === "filters"
              ? "border-black text-black"
              : "border-transparent text-gray-400"
          }`}
        >
          Filters
          {activeCount > 0 && (
            <span className="ml-1.5 text-xs bg-black text-white px-1.5 py-0.5 rounded-full">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      <div className="flex gap-6 pt-28 md:pt-24 px-4 md:px-7">
        <div
          className={`
            w-full md:w-1/4 flex flex-col
            ${mobileTab === "countries" ? "flex" : "hidden"} md:flex
            md:h-[calc(100vh-6rem)] md:sticky md:top-24 md:overflow-y-auto md:no-scrollbar
          `}
        >
          <div className="w-full pb-3">
            <Input
              type="text"
              placeholder="Search Country"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <p className="w-full text-xs text-gray-400 pb-2">
            {loading ? "Loading…" : `${filtered.length} countries`}
          </p>

          <div className="w-full flex flex-wrap gap-2 justify-center">
            <CardSearchFilter
              countries={filtered}
              fullStatus={full}
              onSelect={() => {}}
            />
          </div>

          <div className="mt-5 mb-6 flex justify-center md:hidden">
            {/* Mobile */}
            <Button
              className="rounded-full text-white px-5 py-2 cursor-pointer bg-black hover:scale-105 transition"
              onClick={() => setFull(!full)}
            >
              {full ? "Show less country" : "Show more country"}
            </Button>
          </div>

          {/* Desktop */}
          <Button
            className="rounded-full fixed bottom-8 md:flex justify-center text-white px-5 py-2 cursor-pointer bg-black hover:scale-105 transition z-30 hidden"
            onClick={() => setFull(!full)}
          >
            {full ? "Show less country" : "Show more country"}
          </Button>
        </div>

        <div
          className={`
            w-full md:flex-1 pb-10
            ${mobileTab === "filters" ? "block" : "hidden"} md:block
          `}
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                Filter Countries
              </h2>
              {activeCount > 0 && (
                <span className="bg-black text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {activeCount} active
                </span>
              )}
            </div>
            {activeCount > 0 && (
              <button
                onClick={resetAll}
                className="text-sm text-gray-400 hover:text-black underline underline-offset-2 transition"
              >
                Reset all
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <FilterCard title="Region">
              <div className="flex flex-wrap gap-2">
                {REGIONS.map((r) => (
                  <button
                    key={r}
                    onClick={() => toggleRegion(r)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition ${
                      selectedRegions.includes(r)
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </FilterCard>

            <FilterCard title="Sort By">
              <div className="grid grid-cols-2 gap-2">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSortKey(opt.value)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border text-left transition ${
                      sortKey === opt.value
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </FilterCard>

            <FilterCard title="Max Population">
              <div className="flex flex-wrap gap-2">
                {POPULATION_MARKS.map((m) => (
                  <button
                    key={m.label}
                    onClick={() => setMaxPop(m.value)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition ${
                      maxPop === m.value
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </FilterCard>

            <FilterCard title="Status">
              <div className="flex gap-2">
                {[
                  { label: "All", value: null },
                  { label: "Independent", value: true },
                  { label: "Dependent", value: false },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setIndependent(opt.value)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium border transition ${
                      independent === opt.value
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </FilterCard>
          </div>

          {!loading && (
            <div className="mt-6 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <p className="text-sm text-gray-400 font-medium uppercase tracking-widest mb-4">
                Result Summary
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Stat label="Countries" value={filtered.length.toString()} />
                <Stat
                  label="Total Population"
                  value={fmt(
                    filtered.reduce(
                      (s: number, c: any) => s + (c.population ?? 0),
                      0
                    )
                  )}
                />
                <Stat
                  label="Total Area (km²)"
                  value={fmt(
                    filtered.reduce((s: number, c: any) => s + (c.area ?? 0), 0)
                  )}
                />
                <Stat
                  label="Regions"
                  value={[
                    ...new Set(
                      filtered.map((c: any) => c.region).filter(Boolean)
                    ),
                  ].length.toString()}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
        {title}
      </p>
      {children}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-2xl font-bold tracking-tight">{value}</p>
      <p className="text-xs text-gray-400 mt-0.5">{label}</p>
    </div>
  );
}
