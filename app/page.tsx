"use client"

import { getRandomNote } from "@/components/Notes";
import Reveal from "@/components/Reveal";
import PlaySound from "@/hooks/SoundEffect";
import { useEffect, useState } from "react";

export default function Home() {
	const [reveal, setReveal] = useState(false);
	const [audios, setAudios] = useState<HTMLAudioElement[] | null>(null);
	useEffect(() => {
		setAudios([]);
		}, [])
		
	if (!audios)
		return;

	console.log(audios);
	function onShuffle() {
		PlaySound("/sounds/button.wav");

		if (audios == null) 
			return;

		setReveal(false);
		setAudios([
			new Audio(getRandomNote()),
			new Audio(getRandomNote()),
			new Audio(getRandomNote()),
			new Audio(getRandomNote()),
		  ]);
	  }
	  
	async function onPlay() {
		if (!audios) 
			return;
		for (let i = 0; i < audios.length; i++) {
			audios[i].play();
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}
	}
  return (
	<main className="flex flex-col max-w-2xl m-auto items-center justify-evenly gap-3 h-[100vh]">
		<Reveal reveal={reveal} setReveal={setReveal} audio={audios} />
		<button className="w-full h-1/6" onClick={onPlay}>Play</button>
		<button className="w-full h-1/6" onClick={onShuffle}>Shuffle</button>
	</main>
  );
}
