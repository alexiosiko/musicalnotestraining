"use client"

import Instrument from '@/components/instruments/instrument'
import { instruments } from '@/components/instruments/data'
import { CardDescription, CardFooter, CardHeader, Card, CardTitle, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'
import { Variants, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default async function Index() {

	const xLeft = -50;
	const xRight = -xLeft;
	const upDownAnimate = {
		initial: { y: 20, opacity: 0 },
		whileInView: { y: 0, opacity: 100 }
	}
  return (
	<div className='m-auto mt-4 flex flex-col gap-10'>
		<div className='sm:grid grid-cols-2 items-center gap-4'>
        <motion.div 
			style={{ backgroundImage: `url("/images/landingpage/landingmain.png")` }}
			className='bg-contain bg-center bg-accent h-[230px] rounded-3xl flex' 
			initial={{ x: xLeft, opacity: 0 }}
			whileInView={{ x: 0, opacity: 100 }}
			/>
        <motion.div  className='flex flex-col gap-4 mt-4'
		initial={{ x: xRight, opacity: 0 }}
		whileInView={{ x: 0, opacity: 100 }}>
          <CardTitle>Master your Musical Ear</CardTitle>
          <CardDescription>Sight reading and ear training for musicians. Learn to be an amazing musician</CardDescription>
          <Button size={"sm"} className='w-fit'>
            Start Training
          </Button>
        </motion.div>
      </div>
	  <motion.div {...upDownAnimate} transition={{ delay: 0.5}}>

		<CardTitle>Categories</CardTitle>
	  </motion.div>
		<div className='sm:grid grid-cols-3 gap-4 '>
			<motion.div className='mb-4' 
			{...upDownAnimate}
			transition={{ delay: 0.7}}>
				<Image src="/images/landingpage/eartraining.png" width={400} height={250} alt='module.png' />
				<CardHeader>Ear Training</CardHeader>
				<CardDescription>Improve your musical ear by identifying notes and chord.</CardDescription>
			</motion.div>
			<motion.div className='mb-4' 
			{...upDownAnimate}
			transition={{ delay: 0.4}}>
				<Image src="/images/landingpage/sightreading.png" width={400} height={250} alt='module.png' />
				<CardHeader>Sight Reading</CardHeader>
				<CardDescription>Learn to read sheet music. Practice recognizing notes and chords.</CardDescription>
			</motion.div>
			<motion.div className='mb-4' 
			{...upDownAnimate}
			transition={{ delay: 0.6}}>
				<Image src="/images/landingpage/rhythmtraining.png" width={400} height={250} alt='module.png' />
				<CardHeader>Rhythm Training</CardHeader>
				<CardDescription>Develop a steady sense of rhythm by clapping or tapping along.</CardDescription>
			</motion.div>
		</div>
		<div>
			<motion.div {...upDownAnimate} transition={{ delay: 0.5}}>
				<CardTitle>Ear Training</CardTitle>
			</motion.div>
			<CardContent className='mt-4'>
				<div className='flex justify-center gap-10 flex-wrap'>
					{instruments.map((instrument, index) => 
						<Instrument upDownAnimate={upDownAnimate} index={index} key={index} instrument={instrument} />
					)}
				</div>
			</CardContent>
		</div>
		<div>
			<motion.div {...upDownAnimate} transition={{ delay: 0.5}}>
				<CardTitle>Sight Reading</CardTitle>
			</motion.div>
			<motion.div {...upDownAnimate} transition={{ delay: 0.5}}>
				<CardContent>
					<CardDescription className='h-48 mt-4'>Currently in Development...</CardDescription>
				</CardContent>
			</motion.div>
		</div>
		<div>
			<motion.div {...upDownAnimate} transition={{ delay: 0.5}}>
				<CardTitle>Rhythm Training</CardTitle>
			</motion.div>
			<motion.div {...upDownAnimate} transition={{ delay: 0.5}}>
				<CardContent>
					<CardDescription className='h-48 mt-4'>Currently in Development...</CardDescription>
				</CardContent>
			</motion.div>
		</div>
		<div className='h-[300px]' />
	</div>
  )
}
