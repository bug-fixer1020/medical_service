// app/api/live-consult/search/route.js
import db from "@/app/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    
    if (!query) {
      return new Response("Search query required", { status: 400 });
    }
    
    const liveconsult = db("live-consult");
    const results = await liveconsult.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } }
      ]
    }).toArray();
    
    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    console.error("Error searching live consults:", error);
    return new Response("Failed to search live consults", { status: 500 });
  }
}