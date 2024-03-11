"use client"

import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import stripe from 'stripe';

export default function Page() {
	const searchParams = useSearchParams();
	const [invoice, setInvoice] = useState();
	const [checkout_session_id, setCheckout_session_id] = useState("");
	async function createReceipt() {

	}
	useEffect(() => {
		createReceipt();
	}, [checkout_session_id])
	console.log("running");
	console.log('Invoice created:', invoice);

	
	
  return (
	<div>
		{searchParams.get('checkout_session_id')}
	</div>
  )
}
