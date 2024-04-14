import Stripe from 'stripe';
import { setCredits, setSessionId } from '../customerapi';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY as string);


export async function POST(req: Request, res: Response) {
	const body = await req.text();
	const sig = req.headers.get('stripe-signature');
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

	let object;
    try {
        switch (event.type) {
			case 'invoice.paid':
				object = event.data.object;
				if ((await setCredits(object)) == false)
					return Response.json('Unsuccessfully set customer credits', { status: 502 });
				else
					console.log("Successfully set customer credits");

				console.log("Payment success and setCredits success");
				break;
			case 'checkout.session.completed':
				object = event.data.object;
				if ((await setSessionId(object)) == false)
					return Response.json('Unsuccessfully set customer sessionId', { status: 501 });
				else
					console.log("Successfully set customer sessionid");

				break;
			default: break;

		}
	} catch (error) {
		console.error(error);
		return Response.json('Webhook handler failed.', { status: 400 });
	}

	return Response.json({ received: true });
}