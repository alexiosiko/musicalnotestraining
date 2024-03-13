import { queryStringToJson } from "@/api/utils";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY as string);

const YOUR_DOMAIN = process.env.YOUR_DOMAIN;

export async function POST(req: Request, res: Response) {
	const queryString = await req.text();
	const json = queryStringToJson(queryString);
	const session_id = json.session_id;
	const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

	// This is the url to which the customer will be redirected when they are done
	// managing their billing with the portal.
	const returnUrl = YOUR_DOMAIN;

	const portalSession = await stripe.billingPortal.sessions.create({
		customer: checkoutSession.customer,
		return_url: returnUrl,
	});

	redirect(portalSession.url);
}