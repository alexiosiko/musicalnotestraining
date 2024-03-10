import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import rawBody from 'raw-body';
import { NextApiRequest } from 'next';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
	const body = await req.text()
    const signature = req.headers.get('stripe-signature') as string;

    let event;
    try {
      event = stripe.webhooks.constructEvent(
		body,
        signature,
        process.env.WEBHOOK_SECRET as string
      );
    } catch (err: any) {
      // On error, log and return the error message.
      console.log(`❌ Error message: ${err.message}`);
	  return new NextResponse(JSON.stringify({ ok: false }), { status: 400 });  
    }

    switch (event.type) {
		case 'payment_intent.payment_failed': {
			const paymentIntent = event.data.object;
			console.log(
			`❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
			);
			break;
		}
		case 'charge.succeeded': {
			const charge = event.data.object;
			console.log(`Charge id: ${charge.id}`);
			break;
		}
    }

    // Return a response to acknowledge receipt of the event.
	return new NextResponse(JSON.stringify({ ok: true }), { status: 200 });  
};

function streamToBuffer(arg0: any) {
	throw new Error('Function not implemented.');
}

