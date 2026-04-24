import { MongoClient } from "mongodb";

const uri = process.env.Mongo_Uri;
const dbName = process.env.Mongo_Db;

let client;
let db;

if (!uri) {
  throw new Error("MONGODB_URI environment variable is not set");
}

if (!dbName) {
  throw new Error("MONGODB_DB environment variable is not set");
}

async function connectClient() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
  }
  return db;
}

export default async function connectDB(collectionName) {
  const database = await connectClient();
  return database.collection(collectionName);
}