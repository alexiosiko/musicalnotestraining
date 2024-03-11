import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import rawBody from 'raw-body';
import { NextApiRequest } from 'next';
import { buffer } from 'micro';
import { addCredits } from '../mongodb/userapi';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Stripe requires the raw body to construct the event.
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// payment links
const PaymentLink = {
	basic: "plink_1OsX0qJWOxm8lyxDV2uTdCgR",
}

const creditMapping: Record<string, number> = {
	[PaymentLink.basic]: 50,
};

export async function POST(req: Request) {
	const body = await req.text()
    const signature = req.headers.get('stripe-signature') as string;
	const bodyObject = await JSON.parse(body);
	let userId = bodyObject.data.object.client_reference_id as string;

	let event;
    try {
      event = stripe.webhooks.constructEvent(
		body,
        signature,
        process.env.WEBHOOK_SECRET as string
      );
    } catch (err: any) {
      // On error, log and return the error message.
      console.log(`❌ Error message: ${err.message}`);
	  return new NextResponse(JSON.stringify({ header: "Something went wrong :(", description: "Error validating a valid payment" }), { status: 400 });  
    }
	if (userId && event.type) {
		switch (event.type) {
			case 'payment_intent.succeeded':
			 		// Successfull payment
				const object: any = event.data.object;
				const paymentLink = object.payment_link
				userId = object.client_reference_id as string;

				// Get credits based on paymentLink
				let credits = creditMapping[paymentLink] || 0;

				addCredits(userId, credits).then(res => {
					if (res == true) {
						console.log(`Successfully added ${credits} credits to mongodb user: ${userId}`)
					} else {
						console.error(`Error, could not add ${credits} credits to mongodb user: ${userId}`)
					}
				}).catch(err => {
					console.error(err);
					return new NextResponse(JSON.stringify({ header: "Error :(", description: `Something went wrong with our database :(` }), { status: 500 });  
				})
			// ... handle other event types
			default:
			  console.log(`Unhandled event type ${event.type}`);
		  }

			
	}

    // Return a response to acknowledge receipt of the event.
	return new NextResponse(JSON.stringify({ received: true }), { status: 200 });  

};

function streamToBuffer(arg0: any) {
	throw new Error('Function not implemented.');
}

