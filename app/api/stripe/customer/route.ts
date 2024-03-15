import { stripe } from "../stripe";

// Get customer
export async function POST(req: Request, res: Response) {
	console.log("/api/stripe/customer/credits");
	const body = await req.text();
	const json = JSON.parse(body);
	const userId = json.userId;
	try {
		const customer = await stripe.customers.list({
            limit: 1,
            metadata: {
                userId: userId
            }
        });
		if (customer.data.length > 0) {
            return new Response(JSON.stringify({
                customerId: customer.data[0].id,
            }), { status: 200 });
        } else {
            return new Response(JSON.stringify({
                message: "Customer not found",
            }), { status: 404 });
        }
	} catch (error: any) {
		console.error('Error fetching customer:', error);
		return new Response(JSON.stringify({ message: error.message }), { status: 500 });
	}
}