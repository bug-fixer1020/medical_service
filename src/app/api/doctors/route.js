
import db from "@/app/lib/db"

import { ObjectId } from "mongodb";


// doctor get

export async function GET(request) {
  try {
    const doctorsCollection = await db("doctors");
    const doctors = await doctorsCollection.find({}).toArray();
    return new Response(JSON.stringify(doctors), { status: 200 });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return new Response("Failed to fetch doctors", { status: 500 });
  }
}

// doctor POST

export async function POST(request) {
  try {
    const body = await request.json();
    const doctorsCollection = await db("doctors");

    // Add timestamps
    const doctorData = {
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const result = await doctorsCollection.insertOne(doctorData);

    return new Response(JSON.stringify({
      success: true,
      message: "Doctor added successfully",
      data: { ...doctorData, _id: result.insertedId }
    }), { status: 201 });
  } catch (error) {
    console.error("Error adding doctor:", error);
    return new Response(JSON.stringify({
      success: false,
      error: "Failed to add doctor"
    }), { status: 500 });
  }
}



// put doctors
export async function PUT(request) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    const doctorsCollection = await db("doctors");

    const result = await doctorsCollection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error updating doctor:", error);
    return new Response("Failed to update doctor", { status: 500 });
  }
}

// delete doctors
export async function DELETE(request) {
  try {
    const body = await request.json();
    const { id } = body;
    const doctorsCollection = await db("doctors");

    const result = await doctorsCollection.deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    return new Response("Failed to delete doctor", { status: 500 });
  }
}









