"use client"

import React, { useEffect } from 'react'
import { plans } from "@/components/plans/plans";
import Plan from '@/components/plans/plan';
import { setUser } from '../api/mongodb/userapi';
import { useUser } from '@clerk/nextjs';


export default function Plans() {
	const clerkUser = useUser();

	useEffect(() => {
		if (!clerkUser.user)
			return;		
		// Make sure user exists, if not, create
		setUser(clerkUser.user.id);
	}, [clerkUser?.user]);
  return (
	<div className='m-auto mt-12 gap-12 flex flex-col'>
		<p className='text-center'>Buy More Credits!</p>
		<div className='flex flex-wrap gap-4 justify-center'>
			{plans.map((plan, index: number) => 
				<Plan data={plan} key={index} />
			)}
		</div>
	</div>
  )
}
