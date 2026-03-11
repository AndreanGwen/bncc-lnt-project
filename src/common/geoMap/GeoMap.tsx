"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "@vnedyalk0v/react19-simple-maps";
import { geoCentroid } from "d3-geo";
import { useEffect, useState } from "react";

const LABEL_COUNTRIES = [
  "USA",
  "BRA",
  "DEU",
  "IND",
  "CHN",
  "JPN",
  "IDN",
  "AUS",
  "CAN",
];

const COUNTRY_IDS: Record<string, string> = {
  USA: "united states",
  BRA: "brazil",
  DEU: "germany",
  IND: "india",
  CHN: "china",
  JPN: "japan",
  IDN: "indonesia",
  AUS: "australia",
  CAN: "canada",
};
const LABEL_OFFSETS: Record<string, [number, number]> = {
  USA: [-70, 70],
  CAN: [20, -60],
  BRA: [20, -50],
  DEU: [10, -90],
  JPN: [30, -50],
  IDN: [-70, 55],
  AUS: [10, -60],
  IND: [-10, 10],
  CHN: [80, 30],
};

export default function GeoMap({ setActiveCountry }: any) {
  const [worldData, setWorldData] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadMap = async () => {
      try {
        const res = await fetch("/world.json");
        const data = await res.json();

        setWorldData(data);

        setTimeout(() => {
          setIsLoaded(true);
        }, 500);
      } catch (error) {
        console.error("Failed loading map:", error);
      }
    };

    loadMap();
  }, []);

  return (
    <div className="flex-1 h-[80vh] relative border rounded-2xl shadow overflow-hidden md:block hidden">
      {!isLoaded && (
        <div className="flex justify-center items-center h-full gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      )}

      {worldData && (
        <div
          className={
            isLoaded
              ? "opacity-100 transition-opacity duration-700"
              : "opacity-0"
          }
        >
          <ComposableMap
            viewBox="0 0 800 450"
            style={{ width: "100%", height: "100%" }}
            projectionConfig={{ scale: 147 }}
          >
            <Geographies geography={worldData}>
              {({ geographies }) => (
                <>
                  {geographies.map((geo: any, index: number) => {
                    const code = geo.properties?.["ISO3166-1-Alpha-3"] ?? "";
                    const isLabeled = LABEL_COUNTRIES.includes(code);

                    return (
                      <Geography
                        key={index}
                        geography={geo}
                        onClick={() => {
                          const code = geo.properties?.["ISO3166-1-Alpha-3"];
                          if (!code || !LABEL_COUNTRIES.includes(code)) return;

                          setActiveCountry(code);
                        }}
                        style={{
                          default: {
                            fill: isLabeled ? "#bfdbfe" : "#e5e7eb",
                            stroke: "#ffffff",
                            strokeWidth: 0.5,
                            outline: "none",
                          },
                          hover: {
                            fill: "#93c5fd",
                            stroke: "#ffffff",
                            strokeWidth: 0.5,
                            outline: "none",
                            cursor: "pointer",
                          },
                        }}
                      />
                    );
                  })}

                  {geographies
                    .filter((geo: any) =>
                      LABEL_COUNTRIES.includes(
                        geo.properties?.["ISO3166-1-Alpha-3"] ?? ""
                      )
                    )
                    .map((geo: any, index: number) => {
                      const centroid = geoCentroid(geo);
                      const code = geo.properties?.["ISO3166-1-Alpha-3"] ?? "";
                      const [ox, oy] = LABEL_OFFSETS[code] ?? [0, -50];

                      const labelWidth =
                        (geo.properties?.name?.length ?? 5) * 7 + 16;

                      return (
                        <Marker key={index} coordinates={centroid as any}>
                          <line
                            x1={0}
                            y1={0}
                            x2={ox}
                            y2={oy + 22}
                            stroke="#2563eb"
                            strokeWidth={1}
                          />

                          <circle
                            r={3}
                            fill="#2563eb"
                            stroke="#ffffff"
                            strokeWidth={1.5}
                          />

                          <g
                            transform={`translate(${
                              ox - labelWidth / 2
                            }, ${oy})`}
                          >
                            <rect
                              width={labelWidth}
                              height={22}
                              rx={5}
                              ry={5}
                              fill="#2563eb"
                            />

                            <text
                              x={labelWidth / 2}
                              y={15}
                              textAnchor="middle"
                              style={{
                                fontSize: "8px",
                                fill: "#ffffff",
                                fontWeight: "bold",
                                pointerEvents: "none",
                              }}
                            >
                              {geo.properties?.name ?? ""}
                            </text>
                          </g>
                        </Marker>
                      );
                    })}
                </>
              )}
            </Geographies>
          </ComposableMap>
        </div>
      )}
    </div>
  );
}
