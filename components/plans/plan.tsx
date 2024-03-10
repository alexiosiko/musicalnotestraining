import React from "react";
import { Button } from "../ui/button";
import Text from "../ui/text";
import { useUser } from "@clerk/nextjs";

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
		<div className="rounded-[10px] bg-accent pl-6 pr-6 p-4 w-[404px] text-center flex flex-col gap-3">
			<Text className="text-xl font-bold">{data.header}</Text>
			<p className="text-5xl mt-12">{data.credits}<span className="text-accent-foreground text-sm">credits</span></p>
			<p className="text-xl  mb-12">${data.price}</p>
			<a onClick={handleClick}>
				<Button size={'sm'} className="w-full">Buy</Button>
			</a>
		</div>
  );
}
