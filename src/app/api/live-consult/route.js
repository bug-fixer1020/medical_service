import db from "@/app/lib/db"
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    const liveconsult = await db("live-consult");
    const liveconsults = await liveconsult.find({}).toArray();
    return new Response(JSON.stringify(liveconsults), { status: 200 });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return new Response("Failed to fetch doctors", { status: 500 });
  }
}
// put api 
export async function PUT(request) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    const liveconsult = await db("live-consult");

    const result = await liveconsult.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error updating live consult:", error);
    return new Response("Failed to update live consult", { status: 500 });
  }
}

// delete old liveconsult
export async function DELETE(request) {
  try {
    const body = await request.json();
    const { id } = body;
    const liveconsult = await db("live-consult");

    const result = await liveconsult.deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error deleting live consult:", error);
    return new Response("Failed to delete live consult", { status: 500 });
  }
}