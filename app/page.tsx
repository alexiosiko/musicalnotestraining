"use client"

import Instrument from '@/components/instruments/instrument'
import { instruments } from '@/components/instruments/data'
import { CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import AnimatedDiv from '@/components/animate'
import Link from 'next/link'

export default function Index() {
  return (
	<div className='m-auto mt-4 flex flex-col gap-10 overflow-hidden'>
		<div className='sm:grid grid-cols-2 items-center gap-4'>
		<AnimatedDiv
		direction='left'
			style={{ backgroundImage: `url("/images/landingpage/landingmain.png")` }}
			className='bg-contain bg-center bg-accent h-[230px] rounded-3xl flex'
			/>
		<AnimatedDiv direction='right' className='flex flex-col gap-4 mt-4'>
		<CardTitle>Master your Musical Ear</CardTitle>
		<CardDescription>Sight reading and ear training for musicians. Learn to be an amazing musician</CardDescription>
		<Link href="#starttraining" >
			<Button size={"sm"}>

			Go to Modules
			</Button>
		</Link>
		</AnimatedDiv>
		</div>
		
		<AnimatedDiv direction='up' delay={0.1}> 
			<CardTitle>Categories</CardTitle>
		</AnimatedDiv>
		<div className='sm:grid grid-cols-3 gap-4 '>
			<AnimatedDiv className='mb-4' direction='right' delay={0.2}>
				<Image src="/images/landingpage/eartraining.png" width={400} height={250} alt='module.png' />
				<CardHeader>Ear Training</CardHeader>
				<CardDescription>Improve your musical ear by identifying notes and chord.</CardDescription>
			</AnimatedDiv>
			<AnimatedDiv className='mb-4' direction='right' delay={0.4}>
				<Image src="/images/landingpage/sightreading.png" width={400} height={250} alt='module.png' />
				<CardHeader>Sight Reading</CardHeader>
				<CardDescription>Learn to read sheet music. Practice recognizing notes and chords.</CardDescription>
			</AnimatedDiv>
			<AnimatedDiv className='mb-4' direction='right' delay={0.6}>
				<Image src="/images/landingpage/rhythmtraining.png" width={400} height={250} alt='module.png' />
				<CardHeader>Rhythm Training</CardHeader>
				<CardDescription>Develop a steady sense of rhythm by clapping or tapping along.</CardDescription>
			</AnimatedDiv>
		</div>
		<div id='starttraining'>
			<CardTitle>Ear Training</CardTitle>
			<CardContent className='mt-4'>
				<div className='flex justify-center gap-10 flex-wrap'>
					{instruments.map((instrument, index) => 
						<AnimatedDiv key={index} direction='right' delay={index / 10}> 
							<Instrument index={index} key={index} instrument={instrument} />
						</AnimatedDiv>
					)}
				</div>
			</CardContent>
		</div>
		<div>
			<AnimatedDiv direction='up' delay={0.1}> 
				<CardTitle>Sight Reading</CardTitle>
			</AnimatedDiv>
			<AnimatedDiv direction='up' delay={0.1}> 
				<CardContent>
					<CardDescription className='h-48 mt-4'>Currently in Development...</CardDescription>
				</CardContent>
			</AnimatedDiv>
		</div>
		<div>
			<AnimatedDiv direction='up' delay={0.1}> 
				<CardTitle>Rhythm Training</CardTitle>
			</AnimatedDiv>
			<AnimatedDiv direction='up' delay={0.1}> 
				<CardContent>
					<CardDescription className='h-48 mt-4'>Currently in Development...</CardDescription>
				</CardContent>
			</AnimatedDiv>
		</div>
		<div className='h-[300px]' />
	</div>
  )
}
