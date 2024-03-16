import { queryStringToJson } from "@/api/utils";
import { setCredits } from "../customerapi";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY as string);


export async function POST(request: Request, res: Response) {
	const rawBody = await request.text(); // Get the raw body of the request
	let event;
    // Replace this endpoint secret with your endpoint's unique secret
    // If you are testing with the CLI, find the secret by running 'stripe listen'
    // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    // at https://dashboard.stripe.com/webhooks
    const endpointSecret = process.env.WEBHOOK_SECRET;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
		// Get the signature sent by Stripe
		const signature = request.headers.get('stripe-signature');
		try {
			event = stripe.webhooks.constructEvent(
			rawBody,
			signature,
			endpointSecret
			);
		} catch (err: any) {
			console.log(`⚠️  Webhook signature verification failed.`, err.message);
			return new Response(null, { status: 400 })
		}
    }
    let object;
    let status;
    // Handle the event
    switch (event.type) {
		case 'invoice.paid':
			object = event.data.object;
			const credits = object.lines.data[0].plan.metadata.credits;
			const customer = await stripe.customers.retrieve(object.customer);

			if (await setCredits(customer, credits)) {
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

