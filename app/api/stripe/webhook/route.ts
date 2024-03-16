import { queryStringToJson } from "@/api/utils";
import { setCredits } from "../customerapi";
import Stripe from 'stripe';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY as string);


export async function POST(req: Request, res: Response) {
	const body = await req.text();
	const sig = req.headers.get('stripe-signature') as string;
	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
	let event: Stripe.Event;

	try {
		if (!sig || !webhookSecret)
		return new Response('Webhook secret not found.', { status: 400 });
		event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
		console.log(`🔔  Webhook received: ${event.type}`);
	} catch (err: any) {
		console.log(`❌ Error message: ${err.message}`);
		return new Response(`Webhook Error: ${err.message}`, { status: 400 });
	}
	let object;
	let status;
    // Handle the event
    switch (event.type) {
		case 'invoice.paid':
			object = event.data.object as Stripe.Invoice;
			const credits = object.lines.data[0].plan?.metadata?.credits;
			if (credits == undefined)
				throw Error("Could not retrieve credits from plan.metadata");
			// const credits = object?.lines.data[0].plan.metadata.credits;
			const customer = await stripe.customers.retrieve(object.customer);

			if (await setCredits(customer, parseInt(credits))) {
				console.log(`Successfully set ${credits} credits to customerId: ${customer.id}`);
			} else {
				console.error(`Unsuccefful set ${credits} credits to customerId: ${customer.id}`);
			}

			break;
		case 'customer.subscription.deleted':
			object = event.data.object;
			status = object.status;
			break;
		case 'customer.subscription.created':
			object = event.data.object;
			status = object.status;
			// console.log(`Subscription status is ${status}.`);
			// Then define and call a method to handle the subscription created.
			// handleSubscriptionCreated(subscription);
			break;
		case 'customer.subscription.updated':
			object = event.data.object;
			status = object.status;
			// console.log(`Subscription status is ${status}.`);
			// Then define and call a method to handle the subscription update.
			// handleSubscriptionUpdated(subscription);
			break;
		default:
			// Unexpected event type
			console.log(`Unhandled event type ${event.type}.`);
    }
    // Return a 200 response to acknowledge receipt of the event
    return Response.json({ message: "Alexi it payed"}, { status: 200 });
}

