"use client"

import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import Play from "@/components/play";
import { Howl } from 'howler';
import { Audio } from "@/types/audio";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import Reveal from "@/components/Reveal";
import { useUser } from "@clerk/nextjs";
import { getCredits, setUser } from "@/lib/userapi";

export default function InstrumentPage() {
	const clerkUser = useUser();
	const [tempo, setTempo] = useState<number>(0.7);
	const [isPlaying, setIsPlaying] = useState(false);
	const [noteCount, setNoteCount] = useState(3);
	const [reveal, setReveal] = useState(false);
	const [audios, setAudios] = useState<Audio[]>([]);
	const [credits, setCredits] = useState<number>(0);

	useEffect(() => {
		if (!clerkUser.user)
			return;
		
		// Insert user once
		setUser(clerkUser.user.id);

		// Update credits once
		getCredits(clerkUser.user.id).then(credits => setCredits(credits));
	}, [clerkUser?.user]);

	function shuffle() {
		if (audios == null) 
			return;
		killAudios();
		setReveal(false);
		setIsPlaying(false);
		setAudios(getNewAudios(tempo, noteCount));
	}

	useEffect(() => {
		shuffle();
	}, [noteCount, tempo])

	function killAudios() {
		setIsPlaying(true);
	}
	

	function getNotes() {
		const note: string[] | undefined = audios?.map((audio: any) => {
			let str = audio.howl._src;
			str = str.slice(str.length - 7, str.length - 4);
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
		<main className="max-w-5xl ml-auto mr-auto h-[85vh] p-4 flex flex-col justify-center gap-24">
			<div className="flex flex-col gap-4 mt-4">
				<p className="text-center">Piano</p>
				<Reveal src="url('/images/instruments/piano-1.jpg')" getNotes={getNotes} reveal={reveal} setReveal={setReveal} audios={audios} />
				<p className="text-center">Credits: {credits}</p>
				<Play credits={credits} setCredits={setCredits} id={clerkUser.user?.id} audios={audios} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
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



const notes = [
	"/notes/piano/A3.mp3",
    "/notes/piano/As3.mp3",
    "/notes/piano/B3.mp3",
    "/notes/piano/C3.mp3",
    "/notes/piano/Cs3.mp3",
    "/notes/piano/D3.mp3",
    "/notes/piano/Ds3.mp3",
    "/notes/piano/E3.mp3",
    "/notes/piano/F3.mp3",
    "/notes/piano/Fs3.mp3",
    "/notes/piano/G3.mp3",
    "/notes/piano/Gs3.mp3",
]



function getRandomNote() {
	const randomIndex = Math.floor(Math.random() * notes.length);
	return notes[randomIndex];
}

function getNewAudios(tempo: number, noteCount: number): Audio[] {
	const generateRandomDelay = () => (Math.random() * (750 - 200) + 200) / 1000;

	const generateAudioWithDelay = () => {
		const delay = tempo === 0 ? generateRandomDelay() : tempo;
		const howl = new Howl({ src: getRandomNote() });
		return new Audio(howl, delay);
	};

	return Array.from({ length: noteCount }, generateAudioWithDelay);
}