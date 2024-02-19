"use client"

import { getRandomNote } from "@/components/Notes";
import Reveal from "@/components/Reveal";
import PlaySound from "@/hooks/SoundEffect";
import { useEffect, useState } from "react";

export default function Home() {
	const [reveal, setReveal] = useState(false);
	const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

	useEffect(() => {
		setAudio(new Audio(getRandomNote()));
	}, [])

	if (!audio)
		return;
	
	function onShuffle() {
		PlaySound("/sounds/button.wav");
		if (!audio) 
			return;
		setReveal(false);
		audio.currentTime = 0;
		audio.src = getRandomNote();
	  }
	  
	function onPlay() {
		if (!audio) 
			return;
		audio.currentTime = 0;
		audio.play();
	}
  return (
	<main className="flex flex-col max-w-2xl m-auto lg:p-12 items-center justify-center gap-3 h-[100vh]">
		<Reveal reveal={reveal} setReveal={setReveal} audio={audio} />
		<button className="w-1/4" onClick={onPlay}>Play</button>
		<button className="w-1/4" onClick={onShuffle}>Shuffle</button>
	</main>
  );
}
