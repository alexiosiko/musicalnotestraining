import Stripe from 'stripe';
import { setCredits } from '../customerapi';
import { headers } from "next/headers"

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY as string);


export async function POST(req: Request, res: Response) {
	const body = await req.text();
	const sig = req.headers.get('stripe-signature') as string;
	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
	let event: Stripe.Event;
	try {
		if (!sig || !webhookSecret)
			return Response.json('Webhook secret not found.', { status: 401 })
		event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
	} catch (err: any) {
		console.log(`❌ Error message: ${err.message}`);
		return Response.json({ WebHookerror:  err.message, sig: sig, webhookSecret: webhookSecret }, { status: 402 });
	}

    try {
        switch (event.type) {
			case 'invoice.paid':
				const object = event.data.object;
				if ((await setCredits(object)) == false)
					return Response.json('Webhook handler failed.', { status: 500 });
				console.log("Payment success and setCredits success");
				break;
			default: break;
		}

	} catch (error) {
		console.error(error);
		return Response.json('Webhook handler failed.', { status: 400 });
	}

	return Response.json({ received: true });
}