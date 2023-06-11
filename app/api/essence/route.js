import { NextResponse } from "next/server";

const shriekingPrefix = "Shrieking Essence of";
const deafeningPrefix = "Deafening Essence of";

const urlForEssences =
  "https://poe.ninja/api/data/itemoverview?&type=Essence&language=en&league=";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const league = searchParams.get("league") || "Standard";
  const res = await fetch(urlForEssences + league);
  const data = await res.json();
  return NextResponse.json(processResponse(data));
}

const processResponse = (data) => {
  const rawData = data.lines;
  let tableArray = [];
  let shriekingArray = rawData.filter((item) =>
    item.name.includes(shriekingPrefix)
  );
  let deafeningArray = rawData.filter((item) =>
    item.name.includes(deafeningPrefix)
  );
  shriekingArray.forEach((item) => {
    let matchingDeafening = deafeningArray.filter(
      (item2) => item2.baseType === item.baseType
    );
    tableArray.push({
      base: item.baseType,
      shriekingCost: item.chaosValue,
      deafeningCost: matchingDeafening[0].chaosValue,
    });
  });
  return tableArray;
};
