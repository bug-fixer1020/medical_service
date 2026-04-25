import { NextResponse } from 'next/server';
import db from '@/app/lib/db';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
        return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    const appointmentsCollection = await db('appointment');

    const appointment = await appointmentsCollection.findOne({ stripeSessionId: sessionId });

    if (!appointment) {
        return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    return NextResponse.json({
        success: true,
        appointment: {
            doctorName: appointment.doctorName,
            date: appointment.date,
            time: appointment.time,
            fee: appointment.fee
        }
    });
}