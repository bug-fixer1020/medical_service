// app/api/doctors/search/route.js
import db from "@/app/lib/db";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("q");

        if (!query) {
            return new Response("Search query required", { status: 400 });
        }

        const doctorsCollection = db("doctors");
        const results = await doctorsCollection.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { email: { $regex: query, $options: "i" } }
            ]
        }).toArray();

        return new Response(JSON.stringify(results), { status: 200 });
    } catch (error) {
        console.error("Error searching doctors:", error);
        return new Response("Failed to search doctors", { status: 500 });
    }
}