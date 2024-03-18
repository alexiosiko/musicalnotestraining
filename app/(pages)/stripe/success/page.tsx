"use client"

import { Button } from '@/components/ui/button';
import { CardDescription, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Page() {
	const params = useSearchParams();
	const session_id = params.get('session_id');
	if (!session_id)
		return;
	
	return (
		<section className='flex flex-col gap-4 justify-center m-auto max-w-2xl'>
			<div style={{ backgroundImage: `url(/images/thankyou.png)`}} className='bg-cover relative flex justify-center aspect-square w-full m-auto'>
				<div className='m-auto text-center flex flex-col gap-12'>
					<CardTitle className='text-7xl font-extrabold text-white '>Thank you!</CardTitle>
					<CardDescription className=' text-white'>We're excited to help you improve your ear for music.<br />Here's how to get started:</CardDescription>
					<Link href="/">
						<Button size={"sm"} className='outline m-auto max-w-fit'>Go Home</Button>
					</Link>
				</div>
			</div>
		</section>
	)
}
