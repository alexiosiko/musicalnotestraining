"use client"

import { getRandomNote } from "@/components/Notes";
import Reveal from "@/components/Reveal";
import PlaySound from "@/hooks/SoundEffect";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function Home() {

	const [noteCount, setNoteCount] = useState(1);
	const [reveal, setReveal] = useState(false);
	const [audios, setAudios] = useState<HTMLAudioElement[]>();
	useEffect(() => {
		setAudios([ new Audio(getRandomNote()) ]);
	}, [])
		
	if (!audios)
		return;

	

	function onShuffle() {
		PlaySound("/sounds/button.wav");

		if (audios == null) 
			return;

		stopAudios();

		setReveal(false);

		let newAudios = Array.from({ length: noteCount }, () => new Audio(getRandomNote()));


		setAudios(newAudios);
	}
	  
	function stopAudios() {
		audios?.forEach(audio => {
			audio.pause;
			audio.currentTime = 0;
		})
	}
	async function onPlay() {
		if (audios == undefined || audios == null)
			return;
		console.log(audios);

		stopAudios();
		
		for (let i = 0; i < audios.length; i++) {
			audios[i].play();
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}
	}
  return (
	<main className="flex flex-col justify-around h-[100vh] p-2">
		<Reveal reveal={reveal} setReveal={setReveal} audio={audios} />
		<Button className="w-full h-1/6" onClick={onPlay}>Play</Button>
		<Button className="w-full h-1/6" onClick={onShuffle}>Shuffle</Button>
		<div className="text-center gap-2 flex">
			<p className="text-foreground">{noteCount}</p>
			<Slider min={1} max={10} defaultValue={[ 2 ]} onValueChange={(value) => setNoteCount(value[0])} />
		</div>
	</main>
  );
}
