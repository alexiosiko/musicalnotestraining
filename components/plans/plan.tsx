"use client"

import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "../ui/card";
import type { UserResource } from '@clerk/types';

// const asyncStripe = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY as string);

export default function Plan({ data, user, customerId, alertDialogTriggerRef }: {
  data: {
    header: string;
    price: string;
    credits: number;
	lookup_key: string,
  },
  user: UserResource | null | undefined,
  customerId: string | undefined,
  alertDialogTriggerRef: React.RefObject<HTMLButtonElement>
}) {
	const userName = user ? user.firstName : "Empty";
	const action = user ? "/api/create-checkout-session" : undefined; 
	function onClick(e: any) {
		if (action == undefined) {
			e.preventDefault();
			alertDialogTriggerRef.current?.click();
		}
	}
	return (
		<form action={action} onClick={onClick} method="POST" encType="application/json">
			<input hidden name="lookupKey" defaultValue={data.lookup_key} />
			<input hidden name="customerId" defaultValue={customerId} />
			<input hidden name="userId" defaultValue={user ? user.id : "NULL"} />
			<input hidden name="userName" defaultValue={user?.firstName ? user.firstName : "NULL"} />
			<Card className="w-[220px] text-center m-auto">
				<CardHeader>{data.header}</CardHeader>
				<CardContent className="mt-4 mb-4">
					<CardDescription className="text-4xl m-4">${data.price}</CardDescription>
					<CardDescription className="text-xl">{data.credits}</CardDescription>
					<CardDescription className="text-xs mt-2">credits/month</CardDescription>
				</CardContent>
				<CardFooter>
					<a className="w-full" >
						<Button size={'sm'} className="w-full">Subscribe</Button>
					</a>
				</CardFooter>
			</Card>
		</form>
  );
}
