import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const doctorEmail = searchParams.get('email');

    if (doctorEmail !== session.user.email) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const db = await connectDB();
    const appointmentsCollection = db.collection('appointment'); // Your existing collection

    // Fetch only paid appointments for this doctor
    const appointments = await appointmentsCollection
      .find({
        doctorEmail: doctorEmail,
        paymentStatus: 'paid'
      })
      .sort({ date: -1, time: 1 })
      .toArray();

    return NextResponse.json({ success: true, appointments });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}