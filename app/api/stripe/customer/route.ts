const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY as string);

// Get customer
export async function POST(req: Request, res: Response) {
	console.log("/api/stripe/customer");
	const json = await req.json();
	const userId = json.userId;
	let customers;
	let customer;
	try {
		customers = await stripe.customers.search({
			query: `metadata[\'userId\']:\'${userId}\'`,
		  });

		customer = customers.data.findOne((customer: any) => customer.metadata == userId)

		return Response.json({
			_customerId: "",
			userId: userId,
			customers: customers,
			customer: customer
		}, { status: 200 });
	} catch (error: any) {
		console.error('Error fetching customer:', error);
		return Response.json({ message: error.message, userId: userId, customers: customers, customer: customer}, { status: 500});
	}
}