"use client"

import React, { Dispatch, SetStateAction } from "react"
import { Button } from "./ui/button";
import { FaRegEyeSlash } from "react-icons/fa";
import { Audio } from "@/types/audio";

export default function Reveal({ audios, reveal, setReveal, getNotes }: { 
	audios: Audio[] | undefined,
	reveal: boolean,
	setReveal: Dispatch<SetStateAction<boolean>>,
	getNotes: () => JSX.Element
}) {
	const onClick = () => setReveal(!reveal);
	return (
		<Button
			onClick={onClick}
			variant={'secondary'}
			className="m-auto text-4xl w-full md:mt-12 md:mb-12">
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