import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Appointment from '@/models/Appointment';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
        return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    await connectDB();

    const appointment = await Appointment.findOne({ stripeSessionId: sessionId });

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