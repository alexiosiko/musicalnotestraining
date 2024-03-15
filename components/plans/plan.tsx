"use client"

import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "../ui/card";
import type { UserResource } from '@clerk/types';

// const asyncStripe = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY as string);

export default function Plan({ data, user, customerId }: {
  data: {
    header: string;
    price: string;
    credits: number;
	lookup_key: string,
  },
  user: UserResource,
  customerId: string
}) {
	const userName = user.firstName ? user.firstName : "Empty";
	return (
		<form action="/api/stripe/create-checkout-session" method="POST" encType="application/json">
			<input hidden name="lookupKey" defaultValue={data.lookup_key} />
			<input  name="customerId" defaultValue={customerId} />
			<input hidden name="userName" defaultValue={userName} />
			<Card className="w-[220px] text-center">
				<CardHeader>{data.header}</CardHeader>
				<CardContent className="mt-4 mb-4">
					<CardDescription className="text-4xl m-4">${data.price}</CardDescription>
					<CardDescription className="text-xl">{data.credits}<span className="text-xs"> credits</span></CardDescription>
				</CardContent>
				<CardFooter>
					<a className="w-full" >
						<Button size={'sm'} className="w-full">Buy</Button>
					</a>
				</CardFooter>
			</Card>
		</form>
  );
}
