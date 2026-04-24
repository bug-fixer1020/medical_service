import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
let cachedClient = null;
let cachedDb = null;

// Create a MongoClient with connection pooling
export function getClient() {
  if (cachedClient) {
    return cachedClient;
  }

  cachedClient = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  return cachedClient;
}

// Main function to get collection (reusing your existing code structure)
export default async function db(collectionName) {
  try {
    const client = getClient();
    
    // Connect if not already connected
    if (!cachedClient || !cachedClient.topology || !cachedClient.topology.isConnected()) {
      await client.connect();
    }
    
    const database = client.db(process.env.MONGODB_DB);
    return database.collection(collectionName);
  } catch (err) {
    console.error("Database connection error:", err);
    throw new Error("Failed to connect to the database");
  }
}

// Optional: Close connection (for graceful shutdown)
export async function closeConnection() {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
  }
}