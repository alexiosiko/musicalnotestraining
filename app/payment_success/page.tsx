"use client"

import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'

export default function Page() {
	const searchParams = useSearchParams();
	
  return (
	<div className='flex flex-col items-center'>
		<CardHeader>Success!</CardHeader>
		<CardDescription className='text-center'>🎉 We are thrilled to be part of your musical journey. Enjoy every
        moment of your training, and remember, the world is waiting to hear
        your beautiful melodies!</CardDescription>
		<Link href="/" className='mt-24'>
			<Button>
				Return to home
			</Button>
		</Link>
		{searchParams.get('checkout_session_id')}
	</div>
  )
}
