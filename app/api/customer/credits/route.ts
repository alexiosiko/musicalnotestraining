const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Get credits
export async function POST(req: Request, res: Response) {
	console.log("/api/customer/credits");
	const body = await req.text();
	const json = JSON.parse(body);
	const userId = json.userId;
	console.log(body);
	try {
		const customer = await stripe.customers.search({
			query: `metadata[\'userId\']:\'${userId}\'`,
		})
		return new Response(JSON.stringify({
			customer: customer,
		}), { status: 200 });
	} catch (error: any) {
		console.error('Error fetching customer:', error);
		return new Response(JSON.stringify({ message: error.message }), { status: 500 });
	}
}

export async function setCredts(customersId: string): Promise<boolean> {
	throw Error("");
}