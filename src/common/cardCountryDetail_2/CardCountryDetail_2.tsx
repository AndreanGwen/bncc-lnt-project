import { Card, CardContent } from "@/components/ui/card";

export default function CardCountryDetail_2({ data }: any) {
  return (
    <>
      <Card className="border-neutral-800">
        <CardContent className="flex justify-between items-center w-98 py-1">
          <span className="text-xs text-gray-400 ">OFFICIAL NAME</span>
          <span className="text-sm font-semibold">{data.name.official}</span>
        </CardContent>
      </Card>

      <Card className="border-neutral-800">
        <CardContent className="flex justify-between items-center w-98 py-1">
          <span className="text-xs text-gray-400 ">REGION</span>
          <span className="text-sm font-semibold">
            {data.region} / {data.subregion}
          </span>
        </CardContent>
      </Card>

      <Card className="border-neutral-800">
        <CardContent className="flex justify-between items-center w-98 py-1">
          <span className="text-xs text-gray-400 ">LANGUAGE</span>
          <span className="text-sm font-semibold">
            {Object.values(data.languages).join(", ")}
          </span>
        </CardContent>
      </Card>

      <Card className="border-neutral-800">
        <CardContent className="flex justify-between items-center w-98 py-1">
          <span className="text-xs text-gray-400 ">TOP-LEVEL DOMAIN</span>
          <span className="text-sm font-semibold">
            {Object.values(data.tld).join(", ")}
          </span>
        </CardContent>
      </Card>

      <Card className="border-neutral-800">
        <CardContent className="flex justify-between items-center w-98 py-1">
          <span className="text-xs text-gray-400 ">CALLING CODE</span>
          <span className="text-sm font-semibold">
            {data?.idd?.root && data?.idd?.suffixes
              ? data.idd.root + data.idd.suffixes[0]
              : "-"}
          </span>
        </CardContent>
      </Card>

      <Card className="border-neutral-800">
        <CardContent className="flex justify-between items-center w-98 py-1">
          <span className="text-xs text-gray-400 ">DRIVING SIDE</span>
          <span className="text-sm font-semibold">{data?.car?.side}</span>
        </CardContent>
      </Card>

      <Card className="border-neutral-800">
        <CardContent className="flex justify-between items-center w-98 py-1">
          <span className="text-xs text-gray-400 ">FIFA CODE</span>
          <span className="text-sm font-semibold">{data?.fifa}</span>
        </CardContent>
      </Card>

      <Card className="border-neutral-800">
        <CardContent className="flex justify-between items-center w-98 py-1">
          <span className="text-xs text-gray-400 ">START OF WEEK</span>
          <span className="text-sm font-semibold">{data?.startOfWeek}</span>
        </CardContent>
      </Card>
    </>
  );
}
