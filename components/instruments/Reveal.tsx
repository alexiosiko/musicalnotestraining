"use client"

import React, { Dispatch, SetStateAction } from "react"
import { Button } from "../ui/button";
import { FaRegEyeSlash } from "react-icons/fa";
import { Audio } from "@/types/audio";

export default function Reveal({ audios, reveal, setReveal }: { 
	audios: Audio[] | undefined,
	reveal: boolean,
	setReveal: Dispatch<SetStateAction<boolean>>,
}) {
	const onClick = () => setReveal(!reveal);
	function getNotes() {
		let notes: string = "";
		notes += audios?.map(audio  => " " + audio.note);
		return notes;
	}
	return (
		<Button
			onClick={onClick}
			variant={'secondary'}
			className="m-auto text-4xl w-full">
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