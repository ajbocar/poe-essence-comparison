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
  //console.log(data);
  return NextResponse.json(processResponse(data));
}

const removeEssencePrefix = (essenceName) => {
  return essenceName.replace(shriekingPrefix,"").replace(deafeningPrefix,"");
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
  //console.log(shriekingArray);
  //console.log(deafeningArray);
  shriekingArray.forEach((item) => {
    let matchingDeafening = deafeningArray.filter(
      (item2) => removeEssencePrefix(item2.baseType) === removeEssencePrefix(item.baseType)
    );
    tableArray.push({
      base: removeEssencePrefix(item.baseType),
      shriekingCost: item.chaosValue,
      deafeningCost: matchingDeafening[0].chaosValue,
    });
  });
  return tableArray;
};
