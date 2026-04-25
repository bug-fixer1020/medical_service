import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import db from '@/app/lib/db';
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get('email');

    if (userEmail !== session.user.email) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const appointmentsCollection = await db('appointment');

    // Fetch only paid appointments for this user
    const appointments = await appointmentsCollection
      .find({
        patientEmail: userEmail,
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