"use client"

import { Dispatch, SetStateAction } from "react"
import { Button } from "./ui/button";
import { FaRegEyeSlash } from "react-icons/fa";
import { Audio } from "@/types/audio";

export default function Reveal({ audios, reveal, setReveal, src }: { 
	audios: Audio[] | undefined,
	reveal: boolean,
	setReveal: Dispatch<SetStateAction<boolean>>,
	src: string
}) {
	function onClick() {
		setReveal(!reveal);
	}
	function getAndFormateNotes() {
		const notes: string[] | undefined = audios?.map((audio: any) => {
			let str = audio.howl._src;
			str = str.slice(str.length - 6, str.length - 4);
			str = str.replace('/', '');
			str = str.replace('s', '#');
			return  " " + str;
		}
		)
		return <div>
			{notes?.toString()}
		</div>
	}
	return (
		<Button
		style={{ backgroundImage: src}}
			onClick={onClick}
			variant={'secondary'}
			className="w-full h-[300px] aspect-square bg-cover bg-center flex m-auto text-5xl">
				{reveal ?
					<div style={{ textShadow: '2px 2px black'}}>
						{getAndFormateNotes()}
					</div> 
					: 
					<div>
						<FaRegEyeSlash />
					</div>
				}
		</Button>
	)
}