"use client"

// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { plans } from "@/components/plans/data";
import Plan from '@/components/plans/plan';
import { useUser } from '@clerk/nextjs';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { ThreeDots } from 'react-loader-spinner';
import { motion } from "framer-motion";

export default function Plans() {
	const clerkUser = useUser();
	const [customerId, setCustomerId] = useState<string | undefined | null>(undefined);

	useEffect(() => {
		async function fetchData() {
			try {
				if (clerkUser.user == undefined || clerkUser.user.id == undefined)
					return;
				const res = await fetch("/api/stripe/customer", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						userId: clerkUser.user.id,
					})
				})
				const json = await res.json()
				if (res.status != 200) {
					console.error("Error getting customerId: " +  json.message);
					return;
				} 
				const _customerId = json.customerId;
				if (_customerId) 
					setCustomerId(_customerId)
				else {
					setCustomerId("");
			}
			} catch (e) {
				alert(e);
			}
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
