import React from "react";
import { Button } from "../ui/button";
import Text from "../ui/text";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

// const asyncStripe = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY as string);

export default function Plan({ data }: {
  data: {
    header: string;
    price: string;
    credits: number;
	href: string,
  }
}) {
	const user = useUser();
	function handleClick() {
		if (user.user?.id == undefined)
			return;
		let url = data.href;
		url += `?client_reference_id=${user.user.id}`;
		window.location.href = url;
	}
	return (
		<Card className="w-[220px] text-center">
			<CardHeader>{data.header}</CardHeader>
			<CardContent className="mt-4 mb-4">
				<p className="text-4xl m-4">${data.price}</p>
				<p className="text-xl">{data.credits}<span className="text-accent-foreground text-sm">credits</span></p>
			</CardContent>
			<CardFooter>
				<a className="w-full" onClick={handleClick}>
					<Button size={'sm'} className="w-full">Buy</Button>
				</a>
			</CardFooter>
		</Card>
  );
}
