const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY as string);

// Get customer
export async function POST(req: Request, res: Response) {
	console.log("/api/stripe/customer/credits");
	const body = await req.text();
	const json = JSON.parse(body);
	const userId = json.userId;
	try {
		const customers = await stripe.customers.search({
			query: `metadata[\'userId\']:\'${userId}\'`,
		  });
		if (customers.data[0]) {
			return new Response(JSON.stringify({
				customerId: customers.data[0].id,
			}), { status: 200 });
		}
		return new Response(JSON.stringify({
			_customerId: "",
		}), { status: 200 });
	} catch (error: any) {
		console.error('Error fetching customer:', error);
		return new Response(JSON.stringify({ message: error.message}), { status: 500 });
	}
}