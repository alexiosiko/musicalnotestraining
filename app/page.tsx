"use client"

import { getRandomNote } from "@/components/Notes";
import Reveal from "@/components/Reveal";
import { useState } from "react";

export default function Home() {
	const [reveal, setReveal] = useState(false);

	const audio = new Audio(getRandomNote());
	function onShuffle() {
		setReveal(false);
		audio.currentTime = 0;
		audio.src = getRandomNote();
	}
	function onPlay() {
		audio.currentTime = 0;
		audio.play();
	}
  return (
	<main className="flex flex-col items-center justify-center gap-3 h-[100vh]">
		<Reveal reveal={reveal} setReveal={setReveal} audio={audio} />
		<button className="w-1/4" onClick={onPlay}>Play</button>
		<button className="w-1/4" onClick={onShuffle}>Shuffle</button>
	</main>
  );
}
