"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { pathToNote } from "./Notes";
import PlaySound from "@/hooks/SoundEffect";

export default function Reveal({ audio, reveal, setReveal }: { 
	audio: HTMLAudioElement,
	reveal: boolean,
	setReveal: Dispatch<SetStateAction<boolean>>,
}) {
	function onClick() {
		if (reveal == true)
			PlaySound("/sounds/hide.wav")
		else
			PlaySound("/sounds/reveal.wav");
		setReveal(!reveal);
		return
	}
	function getNote() {
		const note: string = pathToNote(audio.src);
		return <div>
			{note}
		</div>
	}
	return (
		<button
			onClick={onClick}
			className="w-full h-1/3 aspect-square text-center">
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