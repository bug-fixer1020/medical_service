import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const {
      doctorName,
      doctorEmail,
      patientName,
      patientEmail,
      date,
      time,
      fee
    } = await req.json();
    
    // Create Stripe Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Appointment with ${doctorName}`,
              description: `Consultation on ${date} at ${time}`,
            },
            unit_amount: fee * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/user/dashboard?tab=appointments`,
      cancel_url: `${process.env.NEXTAUTH_URL}/doctors?canceled=true`,
      metadata: {
        doctorName,
        doctorEmail,
        patientName,
        patientEmail,
        date,
        time,
      },
      customer_email: patientEmail,
    });
    
    return NextResponse.json({ 
      success: true, 
      url: checkoutSession.url,
      sessionId: checkoutSession.id 
    });
    
  } catch (error) {
    console.error('Error creating payment session:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}