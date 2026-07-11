import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
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

// Soft size cap so the DB never blows up. 5 MB per announcement (lots of room).
const MAX_BYTES = 5 * 1024 * 1024;

function payloadTooBig(data) {
  try {
    return JSON.stringify(data).length > MAX_BYTES;
  } catch {
    return true;
  }
}

export async function GET() {
  const client = await clientPromise;
  const db = client.db("sahaja_yoga");
  const items = await db
    .collection("announcements")
    .find({})
    .sort({ pinned: -1, eventDate: -1, createdAt: -1 })
    .toArray();
  return NextResponse.json(items);
}

export async function POST(request) {
  const user = await verifyToken(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await request.json();
  if (payloadTooBig(data)) {
    return NextResponse.json(
      { error: "Announcement is too large. Please use fewer / smaller photos." },
      { status: 413 }
    );
  }

  const now = new Date().toISOString();
  const toInsert = {
    titleEn: data.titleEn || "",
    titleMr: data.titleMr || "",
    descriptionEn: data.descriptionEn || "",
    descriptionMr: data.descriptionMr || "",
    eventDate: data.eventDate || "",
    pinned: !!data.pinned,
    active: data.active !== false,
    media: Array.isArray(data.media) ? data.media : [],
    createdAt: now,
    updatedAt: now,
  };

  const client = await clientPromise;
  const db = client.db("sahaja_yoga");
  const result = await db.collection("announcements").insertOne(toInsert);
  return NextResponse.json({ id: result.insertedId, ...toInsert });
}

export async function PUT(request) {
  const user = await verifyToken(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, ...data } = await request.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  if (payloadTooBig(data)) {
    return NextResponse.json(
      { error: "Announcement is too large. Please use fewer / smaller photos." },
      { status: 413 }
    );
  }

  const client = await clientPromise;
  const db = client.db("sahaja_yoga");
  await db.collection("announcements").updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...data, updatedAt: new Date().toISOString() } }
  );
  return NextResponse.json({ success: true });
}

export async function DELETE(request) {
  const user = await verifyToken(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const client = await clientPromise;
  const db = client.db("sahaja_yoga");
  await db.collection("announcements").deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ success: true });
}
