import { NextResponse } from "next/server";

const urlForLeagues = "https://www.pathofexile.com/api/leagues";

const nonTradeStrings = ["SSF", "Ruthless"];

export async function GET() {
  const res = await fetch(urlForLeagues);
  if (res.headers.get('content-type') !== 'application/json') {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  };
  const data = await res.json();
  let tempLeagues = data.filter((league) => league.endAt !== null);
  let tempTradeLeagues = tempLeagues.filter(
    (league) => !nonTradeStrings.some((v) => league.id.includes(v))
  );
  let returnData = [
    ...tempTradeLeagues,
    { id: "Standard" }
  ];
  return NextResponse.json({ returnData });
}
