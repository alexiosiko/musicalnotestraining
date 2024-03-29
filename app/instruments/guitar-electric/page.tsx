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
		<main className="flex flex-col justify-center h-[80vh]">
			<div className="flex flex-col gap-12">
				<p className="text-center">Guitar Acoustic</p>
				<Reveal reveal={reveal} setReveal={setReveal} audios={audios} />
				<div className="flex  justify-around">
					<Shuffle  isPlaying={isPlaying} shuffle={shuffle} />
					<Play audios={audios} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
				</div>
			</div>
		</main>
	);
}


function _getNotes(audios: Audio[]) {
	const note: string[] | undefined = audios?.map((audio: any) => {
		let str: string = audio.howl._src;
		console.log(str);
		str = str.slice(str.length - 7, str.length - 4);
		str = str.replace('/', '');
		str = str.replace('s', '#');
		return  " " + str;
	})
	return <div>
		{note?.toString()}
	</div>
}


const notes = [
	"/notes/guitar-electric/A3.mp3",
    "/notes/guitar-electric/C3.mp3",
    "/notes/guitar-electric/Ds3.mp3",
    "/notes/guitar-electric/Fs3.mp3",
	"/notes/guitar-electric/A4.mp3",
    "/notes/guitar-electric/C4.mp3",
    "/notes/guitar-electric/Ds4.mp3",
    "/notes/guitar-electric/Fs4.mp3",
	
    "/notes/guitar-electric/E2.mp3",
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

