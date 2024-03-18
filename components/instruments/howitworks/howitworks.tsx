import React from 'react'
import { data } from "./data";
import { CardDescription, CardTitle } from '@/components/ui/card';
export default function HowItWorks () {
	return (
		<>
			{data.map(data => 
				<div>
					<CardTitle>{data.title}</CardTitle>
					<CardDescription>{data.descrition}</CardDescription>
				</div>)}
		</>
	)
}