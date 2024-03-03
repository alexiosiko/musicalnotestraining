"use client"

import { getRandomBouzoukiNote } from "@/lib/notes";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import Play from "@/components/play";
import { Howl } from 'howler';
import { Audio } from "@/types/audio";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import Reveal from "@/components/reveal";

export default function Index() {
	const [tempo, setTempo] = useState<number>(0.7);
	const [isPlaying, setIsPlaying] = useState(false);
	const [noteCount, setNoteCount] = useState(3);
	const [reveal, setReveal] = useState(false);
	const [audios, setAudios] = useState<Audio[]>();
	
	useEffect(() => {
		setAudios(getNewAudios());
	}, [])

	useEffect(() => {
		console.log("shuffling");
		shuffle();
	}, [noteCount, tempo])

	function killAudios() {
		setIsPlaying(true);
	}
	function getNewAudios(): Audio[] {
		const generateRandomDelay = () => (Math.random() * (750 - 200) + 200) / 1000;

		const generateAudioWithDelay = () => {
			const delay = tempo === 0 ? generateRandomDelay() : tempo;
			const howl = new Howl({ src: getRandomBouzoukiNote() });
			return new Audio(howl, delay);
		};

		return Array.from({ length: noteCount }, generateAudioWithDelay);
	}
	function shuffle() {
		if (audios == null) 
			return;
		killAudios();
		setReveal(false);
		setAudios(getNewAudios());
		setIsPlaying(false);
	}

	
	if (!audios)
		return;
	return (
		<main className="max-w-5xl text-2xl ml-auto mr-auto h-[85vh] p-4 flex flex-col justify-center gap-24">
			<div className="flex flex-col gap-4 mt-4">
				<Reveal reveal={reveal} setReveal={setReveal} audio={audios} />
				<p className="text-center">Bouzouki</p>
				<Play audios={audios} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

				<div className="flex items-center justify-between">
					<p className="max-sm:w-24">Note Count:</p>
					<div className="w-4/6 flex items-center gap-2">
						<Slider 
						className="w-full"
						disabled={isPlaying}
							min={1} max={5} 
							defaultValue={[3]} 
							onValueChange={(value) => setNoteCount(value[0])} 
						/>
						<p className="w-14">{noteCount}</p>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<p className="w-24">Tempo:</p>
					<div className="w-4/6 flex items-center gap-2">
						<Slider
						className="w-full"
							disabled={isPlaying}
							min={0} max={10}
							defaultValue={[7]}
							onValueChange={(value) => setTempo(value[0]/10)} 
							/>
						<p className="w-14 text-right">{tempo == 0? <GiPerspectiveDiceSixFacesRandom /> : tempo}</p>
					</div>
				</div>
			</div>
		</main>
	);
}
