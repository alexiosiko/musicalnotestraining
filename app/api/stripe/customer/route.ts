const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY as string);

// Get customer
export async function POST(req: Request, res: Response) {
	console.log("/api/stripe/customer");
	const json = await req.json();
	const userId = json.userId;
	let customers;
	try {
		customers = await stripe.customers.list();
		if (customers.data[0]) {
			return Response.json({
				customerId: customers.data[0].id,
				customers: customers
			}, { status: 200 });
		}

		return Response.json({
			_customerId: "",
			userId: userId,
			customers: customers
		}, { status: 200 });
	} catch (error: any) {
		console.error('Error fetching customer:', error);
		return Response.json({ message: error.message, userId: userId, customers: customers}, { status: 500});
	}
}