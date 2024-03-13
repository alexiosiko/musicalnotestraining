"use client"

import React, { useEffect, useState } from 'react'
import { plans } from "@/components/plans/data";
import Plan from '@/components/plans/plan';
import { getCustomerId, verifyUser } from '../api/mongodb/userapi';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';


export default function Plans() {
	const clerkUser = useUser();
	const [customerId, setCustomerId] = useState<string | undefined | null>(undefined);
	useEffect(() => {
		async function fetchData() {
			if (clerkUser.user == undefined || clerkUser.user.id == undefined)
				return;
			setCustomerId(await getCustomerId(clerkUser.user.id));
		}
		fetchData();
	}, [clerkUser.user?.id])

	return (
		<div className='m-auto mt-12 gap-12 flex flex-col'>
			<CardTitle>Buy More Credits!</CardTitle>
			<div className='grid grid-cols-3 gap-4 justify-center'>
				{customerId === undefined 
					&& 
					<div>
						Fetching data ...

					</div>
				}
				{clerkUser.user && customerId !== undefined && customerId !== null && plans.map((plan, index: number) => 
					<Plan customerId={customerId} user={clerkUser.user} data={plan} key={index} />
				)}
			</div>
		</div>
	)
}
