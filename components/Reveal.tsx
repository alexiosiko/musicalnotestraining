"use client"

import { Dispatch, SetStateAction } from "react"
import { Button } from "./ui/button";
import { FaRegEyeSlash } from "react-icons/fa";
import { Audio } from "@/types/audio";

export default function Reveal({ audios, reveal, setReveal }: { 
	audios: Audio[] | undefined,
	reveal: boolean,
	setReveal: Dispatch<SetStateAction<boolean>>,
}) {
	function onClick() {
		setReveal(!reveal);
	}
	function getNote() {
		const note: string[] | undefined = audios?.map((audio: any) => {
			let str = audio.howl._src;
			str = str.slice(str.length - 6, str.length - 4);
			str = str.replace('/', '');
			str = str.replace('s', '#');
			return  " " + str;
		}
		)
		return <div>
			{note?.toString()}
		</div>
	}
	return (
		<Button
		style={{ backgroundImage: `url("/images/instruments/bouzouki-1.png")`}}
			onClick={onClick}
			variant={'secondary'}
			className="w-full h-[300px] aspect-square bg-cover bg-center flex m-auto text-5xl">
				{reveal ?
					<div style={{ textShadow: '2px 2px black'}}>
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