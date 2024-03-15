import { queryStringToJson } from "@/api/utils";
import { redirect } from "next/navigation";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY as string);

const YOUR_DOMAIN = process.env.YOUR_DOMAIN;


export async function POST(req: Request, res: Response) {
	const query = await req.text();
	const json = queryStringToJson(query);
	const customerId = json.customerId;
	const userId = json.userId;
	const userName = json.userName;
	const prices = await stripe.prices.list({
			lookup_keys: [json.lookup_key],
			expand: ['data.product'],
	});
	let customer;
	if (customerId != "") {
		console.log("Customer has an account, connecting to it.");
		// Use the customerId for the session
		const session = await stripe.checkout.sessions.create({
			customer: customerId,
			billing_address_collection: 'auto',
			line_items: [
			{
				price: prices.data[0].id,
				// For metered billing, do not pass quantity
				quantity: 1,
			},
			],
			mode: 'subscription',
			success_url: `${YOUR_DOMAIN}/checkout_completed?success=true&session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${YOUR_DOMAIN}/checkout_canceled?canceled=true`,
		});
		redirect(session.url);
	} else {
		console.log("Customer does not have an account, creating a new customer.");
	
		// If customerId is not provided, create a new customer
		customer = await stripe.customers.create({
			name: userName,
			metadata: {
				userId: userId,
				credits: 25,
			}
		// Add any additional parameters you want for the new customer
		});

		
		// Use the newCustomerId for the session
		const session = await stripe.checkout.sessions.create({
			customer: customer.id,
			billing_address_collection: 'auto',
			line_items: [
{
				price: prices.data[0].id,
				// For metered billing, do not pass quantity
				quantity: 1,
			},
		],
			mode: 'subscription',
			success_url: `${YOUR_DOMAIN}/success/?success=true&session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${YOUR_DOMAIN}?canceled=true`,
		});
	
		redirect(session.url);
	}
}