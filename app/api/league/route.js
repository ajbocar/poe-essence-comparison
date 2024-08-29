import { NextResponse } from "next/server";

const urlForLeagues = "https://www.pathofexile.com/api/leagues";

const nonTradeStrings = ["SSF", "Ruthless", "Solo Self-Found"];

export const revalidate = 0; //cache???

export async function GET() {
  const res = await fetch(urlForLeagues);
  if (res.headers.get('content-type') !== 'application/json') {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  };
  const data = await res.json();
  console.log(data);
  let tempLeagues = data.filter((league) => league.startAt !== null);
  console.log(tempLeagues);
  let tempTradeLeagues = tempLeagues.filter(
    (league) => !nonTradeStrings.some((v) => league.id.includes(v))
  );
  console.log(tempTradeLeagues);
  let returnData = [
    ...tempTradeLeagues,
    { id: "Standard" }
  ];
  console.log(returnData);
  return NextResponse.json({ returnData });
}
