import Image from 'next/image'
import React from 'react'
import { Audio } from "@/types/audio";

export default function Bouzouki({ audios, reveal }: {
	audios: Audio[] | undefined,
	reveal: boolean
}) {
	let notesString: string[] = [];
	if (audios) {
		notesString = audios.map((audio: any) => {
			let str = audio.howl._src;
			str = str.slice(str.length - 6, str.length - 4);
			str = str.replace('/', '');
			str = str.replace('s', '#');
			return  str;
		})
	}
  return (
		<div
			className='relative bg-cover bg-center w-full h-[250px] left-0 top-0'
			style={{
			backgroundImage: 'url(/bouzouki/bouzouki-fretboard.png)',
			}}
			>
			<div className='flex relative left-[3px] top-24 gap-2'>
				<div className={`${notesString?.includes("D")  && reveal && "bg-accent-foreground"} bg-red-400 w-[3.5%] h-[16px] relative z-10 `}/>
				<div className={`${notesString?.includes("D#") && reveal && "bg-accent-foreground"} bg-red-400 w-[3.5%] h-[16px] relative z-10 `}/>
				<div className={`${notesString?.includes("E")  && reveal && "bg-accent-foreground"} bg-red-400 w-[3.5%] h-[16px] relative z-10 `}/>
				<div className={`${notesString?.includes("F")  && reveal && "bg-accent-foreground"} bg-red-400 w-[3.5%] h-[16px] relative z-10 `}/>
				<div className={`${notesString?.includes("F#") && reveal && "bg-accent-foreground"} bg-red-400 w-[3.5%] h-[16px] relative z-10 `}/>
				<div className={`${notesString?.includes("G")  && reveal && "bg-accent-foreground"} bg-red-400 w-[3.5%] h-[16px] relative z-10 `}/>
				<div className={`${notesString?.includes("G#") && reveal && "bg-accent-foreground"} bg-red-400 w-[3.5%] h-[16px] relative z-10 `}/>
				<div className={`${notesString?.includes("A")  && reveal && "bg-accent-foreground"} bg-red-400 w-[3.5%] h-[16px] relative z-10 `}/>
				<div className={`${notesString?.includes("A#") && reveal && "bg-accent-foreground"} bg-red-400 w-[3.5%] h-[16px] relative z-10 `}/>
				<div className={`${notesString?.includes("B")  && reveal && "bg-accent-foreground"} bg-red-400 w-[3.5%] h-[16px] relative z-10 `}/>
				<div className={`${notesString?.includes("C")  && reveal && "bg-accent-foreground"} bg-red-400 w-[3.5%] h-[16px] relative z-10 `}/>
				<div className={`${notesString?.includes("C#") && reveal && "bg-accent-foreground"} bg-red-400 w-[3.5%] h-[16px] relative z-10 `}/>
			</div>
		</div>

  )
}
