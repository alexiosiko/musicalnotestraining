"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { pathToNote } from "./Notes";
import PlaySound from "@/hooks/SoundEffect";
import { Button } from "./ui/button";
import { FaRegEyeSlash } from "react-icons/fa";

export default function Reveal({ audio, reveal, setReveal }: { 
	audio: HTMLAudioElement[],
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
		const note: string[] = audio.map(audio => {
			let str = audio.src;
			str = str.slice(str.length - 6, str.length - 4);
			str = str.replace('/', '');
			str = str.replace('s', '#');
			return str;
		}
		)
		return <div>
			{note.toString()}
		</div>
	}
	return (
		<Button
			onClick={onClick}
			className="w-full h-1/3 aspect-square text-center text-wrap">
				{reveal ?
					<div>
						{getNote()}
					</div> 
					: 
					<div>
						<FaRegEyeSlash />
					</div>
				}
		</Button>
	)
}