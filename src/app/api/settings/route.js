import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { jwtVerify } from "jose";

async function verifyToken(request) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

const DEFAULTS = {
  selfRealisationVideoUrl: "https://www.youtube.com/watch?v=3395oxkxrxg",
  weeklyYoutubeUrl: "",
  socialYoutubeUrl: "",
  socialFacebookUrl: "https://www.facebook.com/share/1CW5dHLMyL/",
  socialInstagramUrl: "https://www.instagram.com/rahurisahajyoga?igsh=eHcwZWl0dXpwbjM5",
};

async function getSettings() {
  const client = await clientPromise;
  const db = client.db("sahaja_yoga");
  const doc = await db.collection("siteSettings").findOne({ _id: "main" });
  return { ...DEFAULTS, ...(doc || {}) };
}

export async function GET() {
  const s = await getSettings();
  // Never leak the _id back
  delete s._id;
  return NextResponse.json(s);
}

export async function PUT(request) {
  const user = await verifyToken(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await request.json();
  const clean = {};
  for (const k of Object.keys(DEFAULTS)) {
    if (typeof data[k] === "string") clean[k] = data[k].trim();
  }
  clean.updatedAt = new Date().toISOString();

  const client = await clientPromise;
  const db = client.db("sahaja_yoga");
  await db.collection("siteSettings").updateOne(
    { _id: "main" },
    { $set: clean },
    { upsert: true }
  );
  return NextResponse.json({ success: true });
}
