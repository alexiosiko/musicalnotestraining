"use client"

import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function Page() {
	const params = useSearchParams();
  return (
	<div>Success</div>
  )
}
