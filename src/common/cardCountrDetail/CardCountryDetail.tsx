"use client";
import { FaCity, FaMoneyBillWave } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { PiMapPinAreaFill } from "react-icons/pi";

export default function CardCountryDetail({ data }: any) {
  return (
    <>
      <div
        className={`border w-120 h-fit rounded-lg flex gap-4 items-center p-2 shadow`}
      >
        <FaCity size={30} color="#155dfc" />
        <div className={`flex flex-col`}>
          <span className={`text-sm text-black/50`}>Capital</span>
          <span className={`text-md font-semibold`}>{data?.capital}</span>
        </div>
      </div>
      <div
        className={`border w-120 h-fit rounded-lg flex gap-4 items-center p-2 shadow`}
      >
        <FaPeopleGroup size={30} color="#155dfc" />
        <div className={`flex flex-col`}>
          <span className={`text-sm text-black/50`}>Population</span>
          <span className={`text-md font-semibold`}>
            {data?.population?.toLocaleString()}
          </span>
        </div>
      </div>
      <div
        className={`border w-120 h-fit rounded-lg flex gap-4 items-center p-2 shadow`}
      >
        <PiMapPinAreaFill size={30} color="#155dfc" />
        <div className={`flex flex-col`}>
          <span className={`text-sm text-black/50`}>Area</span>
          <span className={`text-md font-semibold`}>
            {data?.area?.toLocaleString()} km<sup>2</sup>
          </span>
        </div>
      </div>
      <div
        className={`border w-120 h-fit rounded-lg flex gap-4 items-center p-2 shadow`}
      >
        <FaMoneyBillWave size={30} color="#155dfc" />
        <div className={`flex flex-col`}>
          <span className={`text-sm text-black/50`}>Currency</span>
          <span className={`text-md font-semibold`}>
            {data?.currencies ? (
              <>
                {Object.values(data.currencies)
                  .map((c: any) => `${c.symbol} ${c.name}`)
                  .join(", ")}
              </>
            ) : (
              "-"
            )}
          </span>
        </div>
      </div>
    </>
  );
}
