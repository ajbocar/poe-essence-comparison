import { NextResponse } from "next/server";

const urlForLeagues =
  "https://poe.ninja/api/data/getindexstate?";

export async function GET() {
  const res = await fetch(urlForLeagues);
  const data = await res.json();
  return NextResponse.json({data});
}