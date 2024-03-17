"use client"

import { Button } from '@/components/ui/button';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';

export default function Page() {
	const params = useSearchParams();
	const session_id = params.get('session_id');
	if (!session_id)
		return;
	
	return (
		<section className='flex flex-col gap-4 '>
			<CardTitle className='text-6xl font-extrabold mt-24 '>Thank you!</CardTitle>
			<CardDescription className='mb-24 ml-3'>We appreciate you being our customer :D</CardDescription>
			<form action="/api/create-portal-session" method="POST" encType="application/json" >
				<input
				hidden
				id="session_id"
				name="session_id"
				defaultValue={session_id}
				/>
				<Button type="submit">
					Manage your billing information
				</Button>
			</form>
		</section>
	)
}
