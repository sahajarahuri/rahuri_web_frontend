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

export async function GET() {
  const client = await clientPromise;
  const db = client.db("sahaja_yoga");
  const items = await db
    .collection("testimonials")
    .find({})
    .sort({ order: 1, createdAt: -1 })
    .toArray();
  return NextResponse.json(items);
}

export async function POST(request) {
  const user = await verifyToken(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await request.json();
  const now = new Date().toISOString();
  const toInsert = {
    quote: data.quote || "",
    author: data.author || "",
    location: data.location || "",
    active: data.active !== false,
    order: typeof data.order === "number" ? data.order : 0,
    createdAt: now,
    updatedAt: now,
  };

  const client = await clientPromise;
  const db = client.db("sahaja_yoga");
  const result = await db.collection("testimonials").insertOne(toInsert);
  return NextResponse.json({ id: result.insertedId, ...toInsert });
}

export async function PUT(request) {
  const user = await verifyToken(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, ...data } = await request.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const client = await clientPromise;
  const db = client.db("sahaja_yoga");
  await db.collection("testimonials").updateOne(
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
  await db.collection("testimonials").deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ success: true });
}
