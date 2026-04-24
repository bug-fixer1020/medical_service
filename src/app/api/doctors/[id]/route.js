
import db from "@/app/lib/db";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const doctorsCollection = await db('doctors');
    const doctor = await doctorsCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!doctor) {
      return Response.json(
        { message: "Doctor not found" },
        { status: 404 }
      );
    }
    return Response.json(doctor, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Invalid ID or server error" },
      { status: 500 }
    );
  }
}