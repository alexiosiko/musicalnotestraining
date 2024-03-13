"use client"

import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';

export default function Page() {
	const params = useSearchParams();
	const session_id = params.get('session_id');
	if (!session_id)
		return;
	
	return (
		<section className='flex flex-col gap-4'>
			<div className="product Box-root">
				<div className="description Box-root">
				<CardTitle>Payment Successful!</CardTitle>
				</div>
			</div>
			<form action="/api/stripe/create-portal-session" method="POST" encType="application/json" >
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
