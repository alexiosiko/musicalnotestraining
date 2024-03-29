"use client"

import { useState } from "react";
import Play from "@/components/instruments/play";
import { Howl } from 'howler';
import { Audio } from "@/types/audio";
import Reveal from "@/components/instruments/Reveal";
import { formateNote, stopCurrentAudios } from "@/lib/utils";
import Shuffle from "@/components/instruments/shuffle";

export default function InstrumentPage() {
	const [isPlaying, setIsPlaying] = useState(false);
	const [reveal, setReveal] = useState(false);
	const [audios, setAudios] = useState<Audio[]>(getNewAudios(0.5, 4));



	function shuffle() {
		if (audios == null) 
			return;
		stopCurrentAudios(audios);
		setIsPlaying(true);
		setReveal(false);
		setIsPlaying(false);
		setAudios(getNewAudios(0.5, 4));
	}

	return (
		<main className="ml-auto mr-auto h-[80vh] p-4 flex flex-col justify-center gap-24">
			<div className="flex flex-col gap-4 mt-4">
				<p className="text-center">Bouzouki</p>
				<Reveal reveal={reveal} setReveal={setReveal} audios={audios} />
				<div className="flex  justify-around">
					<Shuffle isPlaying={isPlaying} shuffle={shuffle} />
					<Play audios={audios} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
				</div>
			</div>
		</main>
	);
}



const notes = [
	"/notes/bouzouki/A.mp3",
    "/notes/bouzouki/As.mp3",
    "/notes/bouzouki/B.mp3",
    "/notes/bouzouki/C.mp3",
    "/notes/bouzouki/Cs.mp3",
    "/notes/bouzouki/D.mp3",
    "/notes/bouzouki/Ds.mp3",
    "/notes/bouzouki/E.mp3",
    "/notes/bouzouki/F.mp3",
    "/notes/bouzouki/Fs.mp3",
    "/notes/bouzouki/G.mp3",
    "/notes/bouzouki/Gs.mp3",
]

function getRandomNote() {
	const randomIndex = Math.floor(Math.random() * notes.length);
	return notes[randomIndex];
}

function getNewAudios(tempo: number, noteCount: number): Audio[] {
	const generateRandomDelay = () => (Math.random() * (750 - 200) + 200) / 1000;

	const generateAudioWithDelay = () => {
		const delay = tempo === 0 ? generateRandomDelay() : tempo;
		const src = getRandomNote();
		const note = formateNote(src);
		const howl = new Howl({ src: src });
		return new Audio(howl, delay, note);
	};

	return Array.from({ length: noteCount }, generateAudioWithDelay);
}

