import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "@vnedyalk0v/react19-simple-maps";
import worldData from "@/data/world.json";
import { geoCentroid } from "d3-geo";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LABEL_COUNTRIES = [
  "USA",
  "BRA",
  "FRA",
  "DEU",
  "IND",
  "CHN",
  "JPN",
  "IDN",
  "AUS",
  "CAN",
];

const LABEL_OFFSETS: Record<string, [number, number]> = {
  USA: [-70, 70],
  CAN: [20, -60],
  BRA: [20, -50],
  DEU: [10, -90],
  FRA: [30, 50],
  JPN: [30, -50],
  IDN: [-70, 55],
  AUS: [10, -60],
  IND: [-10, 10],
  CHN: [80, 30],
};

export default function GeoMap() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex-1 h-[80vh] relative">
      {!isLoaded && (
        <div className="absolute inset-0 pt-52 flex flex-col gap-3">
          <div className="flex gap-3 h-1/4">
            <Skeleton className="w-1/4 bg-black/10" />
            <Skeleton className="w-1/3 bg-black/10" />
            {/* <Skeleton className="w-1/5 bg-black/10" /> */}
            <Skeleton className="flex-1 bg-black/10" />
          </div>

          <div className="flex gap-3 h-1/3">
            <Skeleton className="w-1/3 bg-black/10" />
            <Skeleton className="w-1/4 bg-black/10" />
            {/* <Skeleton className="flex-1 bg-black/10" /> */}
          </div>
        </div>
      )}

      <div
        className={
          isLoaded ? "opacity-100 transition-opacity duration-500" : "opacity-0"
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
                {geographies.map((geo) => {
                  const code = geo.properties?.["ISO3166-1-Alpha-3"] ?? "";
                  const isLabeled = LABEL_COUNTRIES.includes(code);

                  return (
                    <Geography
                      key={(geo as any).rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: isLabeled ? "#bfdbfe" : "#e5e7eb",
                          stroke: "#fff",
                          strokeWidth: 0.5,
                          outline: "none",
                        },
                        hover: {
                          fill: "#93c5fd",
                          stroke: "#fff",
                          strokeWidth: 0.5,
                          outline: "none",
                        },
                      }}
                    />
                  );
                })}

                {geographies
                  .filter((geo) =>
                    LABEL_COUNTRIES.includes(
                      geo.properties?.["ISO3166-1-Alpha-3"] ?? ""
                    )
                  )
                  .map((geo) => {
                    const centroid = geoCentroid(geo);
                    const code = geo.properties?.["ISO3166-1-Alpha-3"] ?? "";
                    const [ox, oy] = LABEL_OFFSETS[code] ?? [0, -50];
                    const labelWidth =
                      (geo.properties?.name?.length ?? 5) * 7 + 16;

                    return (
                      <Marker
                        key={`label-${(geo as any).rsmKey}`}
                        coordinates={centroid as any}
                      >
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
                          stroke="#fff"
                          strokeWidth={1.5}
                        />
                        <g
                          transform={`translate(${ox - labelWidth / 2}, ${oy})`}
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
                              fill: "#fff",
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
    </div>
  );
}
