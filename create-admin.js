import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function createAdminUser() {
  try {
    await client.connect();
    const db = client.db("sahaja_yoga");
    const users = db.collection("users");

    const email = "ankurauti@gmail.com";
    const password = "Ankur@382";
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await users.updateOne(
      { email },
      { $set: { email, password: hashedPassword } },
      { upsert: true }
    );

    if (result.upsertedCount > 0) {
      console.log("Admin user created successfully");
    } else if (result.modifiedCount > 0) {
      console.log("Admin user updated successfully");
    } else {
      console.log("No changes made to admin user");
    }
  } finally {
    await client.close();
  }
}

createAdminUser().catch(console.error);
