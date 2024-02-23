"use client"

import { Notes, getRandomNote } from "@/components/Notes";
import Reveal from "@/components/Reveal";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import Play from "@/components/play";
import Shuffle from "@/components/shuffle";
import { Howl } from 'howler';

export default function Home() {
	const [isPlaying, setIsPlaying] = useState(false);
	const [noteCount, setNoteCount] = useState(2);
	const [reveal, setReveal] = useState(false);
	const [audios, setAudios] = useState<Howl[]>();


	
	useEffect(() => {
		setAudios([
			new Howl({ src: getRandomNote()})
		]);
	}, [])
	
	if (!audios)
		return;


  return (
	<main className="flex flex-col justify-around h-[100vh] p-2 gap-1">
		<p className="text-foreground text-center sm:p-2 max-sm:text-xs">Current notes length: {audios.length}</p>
		<Reveal reveal={reveal} setReveal={setReveal} audio={audios} />
		<Play audios={audios} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
		<Shuffle isPlaying={isPlaying} setIsPlaying={setIsPlaying} audios={audios} noteCount={noteCount} setAudios={setAudios} setReveal={setReveal} />
		<div className="text-center gap-2 flex">
			<p className="text-foreground">{noteCount}</p>
			<Slider min={1} max={5} defaultValue={[ 2 ]} onValueChange={(value) => setNoteCount(value[0])} />
		</div>
	</main>
  );
}
