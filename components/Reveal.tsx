"use client"

import { useState } from "react"
import { pathToNote } from "./Notes";

export default function Reveal({ audio, reveal, setReveal }: { 
	audio: HTMLAudioElement,
	reveal: any,
	setReveal: any,
}) {
	
	function getNote() {
		const note: string = pathToNote(audio.src);
		return <div>
			{note}
		</div>
	}
	return (
		<button
			onClick={() => setReveal(!reveal)}
			className="w-2/3 aspect-square text-center">
				{reveal ?
					<div>
						{getNote()}
					</div> 
					: 
					<div>
						hidden
					</div>
				}
		</button>
	)
}