"use client"

import { getRandomNote } from "@/components/Notes";
import Reveal from "@/components/Reveal";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import Play from "@/components/play";
import Shuffle from "@/components/shuffle";
import { Howl } from 'howler';
import { Checkbox } from "@/components/ui/checkbox";
import { Audio } from "@/types/audio";

export default function Home() {
	const [isLinear, setIsLinear] = useState(true);
	const [isPlaying, setIsPlaying] = useState(false);
	const [noteCount, setNoteCount] = useState(3);
	const [reveal, setReveal] = useState(false);
	const [audios, setAudios] = useState<Audio[]>();
	
	useEffect(() => {
		let newAudios = Array.from({ length: noteCount }, () => new Audio(
			new Howl({
				src: getRandomNote()}),
				Math.random() * (750 - 200) + 200
		));
		setAudios(newAudios);
	}, [])
	
	if (!audios)
		return;
  return (
	<main className="text-foreground flex flex-col justify-around h-[100vh] p-2 gap-1">
		<p className="text-center sm:p-2 max-sm:text-xs">Current notes length: {audios.length}</p>
		<Reveal reveal={reveal} setReveal={setReveal} audio={audios} />
		<div className="flex gap-1">
			<Shuffle isPlaying={isPlaying} setIsPlaying={setIsPlaying} audios={audios} noteCount={noteCount} setAudios={setAudios} setReveal={setReveal} />
			<Play audios={audios} isLinear={isLinear} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
		</div>
		<div className="flex gap-1 justify-center">

			<Checkbox checked={isLinear} onCheckedChange={(bool: any) => setIsLinear(bool)} />
			<label className="text-foreground">Is Timing Linear?</label>
		</div>
		<div className="flex gap-1">
			<p>{noteCount}</p>
			<Slider min={1} max={5} defaultValue={[ 2 ]} onValueChange={(value) => setNoteCount(value[0])} />
		</div>
	</main>
  );
}
