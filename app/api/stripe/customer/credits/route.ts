import { stripe } from "../../stripe";

export async function POST(req: Request, res: Response) {
	const body = await req.text();
	const json = JSON.parse(body);
	const userId = json.userId;
	try {
		const customer = await stripe.customers.search({
			query: `metadata[\'userId\']:\'${userId}\'`,
		})
		return new Response(JSON.stringify({
			customerId: customer.data[0].id
		}), { status: 200 });
	} catch (error) {
		console.error('Error fetching customer:', error);
		return new Response(JSON.stringify({}), { status: 500 });
	}
}