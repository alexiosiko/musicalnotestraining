"use client"

import React from 'react'

export default function Page({ params }: { 
	params: { id: number }
}) {
  return (
	<div>{params.id}</div>
  )
}
