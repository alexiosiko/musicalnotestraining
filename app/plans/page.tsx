import Plan from '@/components/plans/plan'
import React from 'react'
import { plans } from "@/components/plans/plans";

export default function Plans() {
  return (
	<div className='grid grid-cols-3 gap-24 max-w-3xl m-auto'>
		{plans.map((plan, index: number) => 
			<Plan key={index} data={plan} />
		)}
	</div>
  )
}
