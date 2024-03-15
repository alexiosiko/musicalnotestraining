const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY as string);

// Get customer
export async function POST(req: Request, res: Response) {
	console.log("/api/stripe/customer/credits");
	const body = await req.text();
	const json = JSON.parse(body);
	const userId = json.userId;
	let customers;
	try {
		customers = await stripe.customers.list()

		const foundCustomer = customers.data.find((customer: any)=> {
            return customer.metadata && customer.metadata.userId == userId;
        });

		const customerId = foundCustomer.id;
		return new Response(JSON.stringify({
			customerId: customerId,
			customers: customers
		}), { status: 200 });
	} catch (error: any) {
		console.error('Error fetching customer:', error);
		return new Response(JSON.stringify({ message: error.message, customers: customers }), { status: 500 });
	}
}