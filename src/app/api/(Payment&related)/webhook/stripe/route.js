import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import db from '@/app/lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature failed: ${err.message}`);
    return NextResponse.json({ error: 'Webhook signature failed' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    try {
      const appointmentsCollection = await db('appointment');
      
      const {
        doctorName,
        doctorEmail,
        patientName,
        patientEmail,
        date,
        time
      } = session.metadata;
      
      // Check if appointment already exists
      const existingAppointment = await appointmentsCollection.findOne({
        stripeSessionId: session.id
      });
      
      if (!existingAppointment) {
        // Insert directly into your appointment collection
        await appointmentsCollection.insertOne({
          doctorName,
          doctorEmail,
          patientName,
          patientEmail,
          date,
          time,
          paymentStatus: 'paid',
          stripeSessionId: session.id,
          stripePaymentIntentId: session.payment_intent,
          amount: session.amount_total / 100,
          currency: session.currency,
          createdAt: new Date()
        });
        
        console.log('Appointment inserted successfully');
      }
      
    } catch (error) {
      console.error('Error saving appointment:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

export const dynamic = 'force-dynamic';