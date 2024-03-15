import { stripe } from "../stripe";

// Get customer
export async function POST(req: Request, res: Response) {
	console.log("/api/stripe/customer/credits");
	const body = await req.text();
	const json = JSON.parse(body);
	const userId = json.userId;
	let customer;
	try {
		customer = await stripe.customers.search({
			query: `metadata[\'userId\']:\'${userId}\'`,
		})
		console.log(customer.data[0].id);
		return new Response(JSON.stringify({
			customerId: customer.data[0].id,
		}), { status: 200 });
	} catch (error: any) {
		console.error('Error fetching customer:', error);
		return new Response(JSON.stringify({ message: error.message, customer: customer }), { status: 500 });
	}
}