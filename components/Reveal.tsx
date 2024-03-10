"use client"

import React, { Dispatch, SetStateAction } from "react"
import { Button } from "./ui/button";
import { FaRegEyeSlash } from "react-icons/fa";
import { Audio } from "@/types/audio";

export default function Reveal({ audios, reveal, setReveal, src, getNotes }: { 
	audios: Audio[] | undefined,
	reveal: boolean,
	setReveal: Dispatch<SetStateAction<boolean>>,
	src: string,
	getNotes: () => JSX.Element
}) {
	function onClick() {
		setReveal(!reveal);
	}
	return (
		<Button
		style={{ backgroundImage: src}}
			onClick={onClick}
			variant={'secondary'}
			className="w-full h-[300px] aspect-square bg-cover bg-center flex m-auto text-5xl">
				{reveal ?
					<div style={{ textShadow: '2px 2px black'}} className="text-background">
						{getNotes()}
					</div> 
					: 
					<div>
						<FaRegEyeSlash />
					</div>
				}
		</Button>
	)
}