const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request, res: Response) {
	console.log("/api/stripe/customer/credits");
	const body = await req.text();
	const json = JSON.parse(body);
	const userId = json.userId;
	try {
		const customers = await stripe.customers.list();
		console.log(customers);
		const customer = await stripe.customers.search({
			query: `metadata[\'userId\']:\'${userId}\'`,
		})
		const customerId = customer.data[0].id;
		return new Response(JSON.stringify({
			customerId: customerId,
			customers: customers,
		}), { status: 200 });
	} catch (error: any) {
		console.error('Error fetching customer:', error);
		return new Response(JSON.stringify({ message: error.message }), { status: 500 });
	}
}