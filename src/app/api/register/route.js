import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  const { email, password } = await request.json();

  if (email !== "ankurauti@gmail.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db("sahaja_yoga");

  // Check if user already exists
  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await hash(password, 10);

  await db.collection("users").insertOne({
    email,
    password: hashedPassword,
  });

  return NextResponse.json({ message: "User registered successfully" });
}
