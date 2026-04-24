import db from '@/app/lib/db';

export async function POST(req) {
  try {
    const appointmentData = await req.json();

    const appointmentsCollection = db('appointment');

    const appointment = {
      ...appointmentData,
      status: 'confirmed',
      paymentStatus: 'paid',
      createdAt: new Date(),
    };

    const result = await appointmentsCollection.insertOne(appointment);

    return Response.json({ success: true, appointmentId: result.insertedId });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}