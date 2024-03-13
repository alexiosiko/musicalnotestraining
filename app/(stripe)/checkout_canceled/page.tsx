import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

export default function Page() {
  return (
	<div className='flex flex-col justify-center items-center text-white  gap-4 bg-contain h-[447px] w-full' style={{
		backgroundImage: `url("/images/uhoh.png")`
	}}>
		<CardTitle >
			Oops! Your payment cancelled :(
		</CardTitle>
		<Link href="/">
			<Button size={'sm'} className='w-fit'>Click here to go Home</Button>
		</Link>
	</div>
  )
}
