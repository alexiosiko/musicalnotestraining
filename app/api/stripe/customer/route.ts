const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY as string);

// Get customer
export async function POST(req: Request, res: Response) {
	console.log("/api/stripe/customer");
	const json = await req.json();
	const userId = json.userId as string;
	console.log("Searching for userId: ", userId);
	let customers;
	let customer;
	try {
		customers = await stripe.customers.list();

		customer = customers.data.find((_customer: { metadata: { userId: string }}) => _customer.metadata.userId === userId)
		if (customer) {
			console.log("Retreived customerId");
			return Response.json({
				customerId: customer.id,
				userId: userId,
				customers: customers,
			}, { status: 200 });
		}
		console.log("Customer doesn't exist");
		return Response.json({
			customerId: "",
			userId: userId,
			customers: customers,

		}, { status: 200 });
	} catch (error: any) {
		console.error('Error fetching customer:', error);
		return Response.json({ message: error.message, userId: userId, customers: customers }, { status: 500});
	}
}