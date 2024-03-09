import Plan from '@/components/plans/plan'
import React from 'react'
import { plans } from "@/components/plans/plans";

export default function Plans() {
  return (
	<div className='max-w-3xl m-auto mt-12 gap-12 flex flex-col'>

		<p className='text-center'>Buy More Credits!</p>
		<div className='flex gap-4 justify-center'>
			{plans.map((plan, index: number) => 
				<Plan key={index} data={plan} />
			)}
		</div>
	</div>
  )
}
