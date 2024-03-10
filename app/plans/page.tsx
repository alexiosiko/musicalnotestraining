"use client"

import React from 'react'
import { plans } from "@/components/plans/plans";
import Plan from '@/components/plans/plan';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function Plans() {

  return (
	<div className='m-auto mt-12 gap-12 flex flex-col'>
		<p className='text-center'>Buy More Credits!</p>
		<div className='flex gap-4 justify-center'>
			{plans.map((plan, index: number) => 
				<Plan data={plan} key={index} />
			)}
		</div>
	</div>
  )
}
