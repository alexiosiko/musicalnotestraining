
"use client"

import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

export default function page() {
	const searchParams = useSearchParams()
	useEffect(() => {
		console.log("run");
	}, [])

  return (
	<div>
		{searchParams.get('checkout_session_id')}
	</div>
  )
}
