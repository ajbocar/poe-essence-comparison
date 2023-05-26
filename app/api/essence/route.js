import { NextResponse } from "next/server";

const urlForEssences =
  "https://poe.ninja/api/data/itemoverview?league=Crucible&type=Essence&language=en";

export async function GET() {
  const res = await fetch(urlForEssences);
  const data = await res.json();
  return NextResponse.json({ data });
}
