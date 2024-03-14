"use client"

// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { plans } from "@/components/plans/data";
import Plan from '@/components/plans/plan';
import { getCustomerId, verifyUser } from '../api/mongodb/userapi';
import { useUser } from '@clerk/nextjs';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { ThreeDots } from 'react-loader-spinner';
import { motion } from "framer-motion";

export default function Plans() {
	const clerkUser = useUser();
	const [customerId, setCustomerId] = useState<string | undefined | null>(undefined);

	useEffect(() => {
		async function fetchData() {
			if (clerkUser.user == undefined || clerkUser.user.id == undefined)
				return;
			await verifyUser(clerkUser.user.id);
			setCustomerId(await getCustomerId(clerkUser.user.id));
		}
			fetchData();
		}, [clerkUser.user?.id]);

	return (
		<div className='m-auto mt-12 gap-12 flex flex-col'>
			<CardTitle>Buy More Credits!</CardTitle>
			<div>
				{customerId === undefined && (
				<motion.div className='flex gap-2'>
					<CardDescription>Fetching data </CardDescription>
					<ThreeDots height={20} width={40} />
				</motion.div>
				)}
				
				{clerkUser.user && customerId !== undefined && customerId !== null && (
					<motion.div className='sm:grid grid-cols-3 items-center'>
						{plans.map((plan, index: number) => (
							<motion.div key={index}>
								<Plan customerId={customerId} user={clerkUser.user} data={plan} />
							</motion.div>
						))}
					</motion.div>
				)}
			</div>
		</div>
	);
}
