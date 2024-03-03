import Instrument from '@/components/instruments/instrument'
import { instruments } from '@/components/instruments/instruments'
import React from 'react'

export default function Index() {
  return (
	<div className='max-w-5xl m-auto mt-10 flex flex-col gap-10'>
		<div 
        	style={{ backgroundImage: `url("/images/landing-photo.png")`}}
		className='bg-cover bg-center bg-accent h-[600px] rounded-3xl flex'>
			<p className='m-auto text-5xl text-center text-white' style={{textShadow: '2px 2px black'}}>
				Ear Training With Real Instruments
			</p>	
		</div>
		<p className='text-center'>Featured Instruments</p>
		<div className='flex gap-10 justify-center flex-wrap'>
			{instruments.map((instrument, index) => 
				<Instrument key={index} instrument={instrument} />
				)}
		</div>
		<div className='h-[300px]' />
	</div>
  )
}
