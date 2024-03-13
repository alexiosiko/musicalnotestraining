import Instrument from '@/components/instruments/instrument'
import { instruments } from '@/components/instruments/data'
import { Button } from '@/components/ui/button'
import { CardDescription, CardFooter, CardHeader, Card, CardTitle, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

export default async function Index() {

  return (
	<div className='m-auto mt-4 flex flex-col gap-10'>
		<div className='sm:grid grid-cols-2 items-center gap-4'>
			<div style={{ backgroundImage: `url("/images/landingpage/landingmain.png")`}}
			className=' bg-contain bg-center bg-accent h-[230px] rounded-3xl flex' />
			<div className='flex flex-col gap-4 mt-4'>
				<CardTitle>Master your Musical Ear</CardTitle>
				<CardDescription>Sight reading and ear training for musicians. Learn to be an amazing musician</CardDescription>
				<Button size={"sm"} className='w-fit'>
					Start Training
				</Button>
			</div>
		</div>
		<CardTitle>Categories</CardTitle>
		<div className='sm:grid grid-cols-3 gap-4 '>
			<div className='mb-4'>
				<Image src="/images/landingpage/eartraining.png" width={400} height={250} alt='module.png' />
				<CardHeader>Ear Training</CardHeader>
				<CardDescription>Improve your musical ear by identifying notes and chord.</CardDescription>
			</div>
			<div className='mb-4'>
				<Image src="/images/landingpage/sightreading.png" width={400} height={250} alt='module.png' />
				<CardHeader>Sight Reading</CardHeader>
				<CardDescription>Learn to read sheet music. Practice recognizing notes and chords.</CardDescription>
			</div>
			<div className='mb-4'>
				<Image src="/images/landingpage/rhythmtraining.png" width={400} height={250} alt='module.png' />
				<CardHeader>Rhythm Training</CardHeader>
				<CardDescription>Develop a steady sense of rhythm by clapping or tapping along.</CardDescription>
			</div>
		</div>
		<div>
			<CardTitle>Ear Training</CardTitle>
			<CardContent className='mt-4'>
				<div className='flex justify-center gap-10 flex-wrap'>
					{instruments.map((instrument, index) => 
						<Instrument key={index} instrument={instrument} />
					)}
				</div>
			</CardContent>
		</div>
		<div>
			<CardTitle>Sight Reading</CardTitle>
			<CardContent>
				<CardDescription className='h-48 mt-4'>Currently in Development...</CardDescription>
			</CardContent>
		</div>
		<div>
			<CardTitle>Rhythm Training</CardTitle>
			<CardContent>
				<CardDescription className='h-48 mt-4'>Currently in Development...</CardDescription>
			</CardContent>
		</div>
		<div className='h-[300px]' />
	</div>
  )
}
