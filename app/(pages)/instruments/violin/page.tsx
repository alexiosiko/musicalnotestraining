"use client"


import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import Play from "@/components/play";
import { Howl } from 'howler';
import { Audio } from "@/types/audio";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import Reveal from "@/components/Reveal";
import { useUser } from "@clerk/nextjs";
import { getCredits } from "@/app/api/customerapi";
import { stopCurrentAudios } from "@/lib/utils";

export default function InstrumentPage() {
	const clerkUser = useUser();
	const [tempo, setTempo] = useState<number>(0.7);
	const [isPlaying, setIsPlaying] = useState(false);
	const [noteCount, setNoteCount] = useState(3);
	const [reveal, setReveal] = useState(false);
	const [audios, setAudios] = useState<Audio[]>([]);
	const [credits, setCredits] = useState<number>(0);

	useEffect(() => {
		if (clerkUser.user == undefined)
			return;		
		// Update credits once
		async function getAndSetCredits() {
			if (clerkUser.user == undefined)
				return;		
			setCredits(await getCredits(clerkUser.user.id));
		}
		getAndSetCredits();
		
	}, [clerkUser?.user]);

	useEffect(() => {
		shuffle();
	}, [noteCount, tempo])

	function shuffle() {
		if (audios == null) 
			return;
		stopCurrentAudios(audios);
		setIsPlaying(true);
		setReveal(false);
		setIsPlaying(false);
		setAudios(getNewAudios(tempo, noteCount));
	}

	const getNotes = () => _getNotes(audios);

	return (
		<main className=" ml-auto mr-auto h-[85vh] p-4 flex flex-col justify-center gap-24">
			<div className="flex flex-col gap-4 mt-4">
				<p className="text-center">Violin</p>
				<Reveal getNotes={getNotes} reveal={reveal} setReveal={setReveal} audios={audios} />
				<p className="text-center">Credits: {credits}</p>
				<Play credits={credits} setCredits={setCredits} id={clerkUser.user?.id} audios={audios} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
				<div className="flex items-center justify-between">
					<p className="max-sm:w-24 max-sm:text-sm">Note Count:</p>
					<div className="w-4/6 flex items-center gap-2">
						<Slider 
							className="w-full"
							disabled={isPlaying}
							min={1} max={5} 
							defaultValue={[3]} 
							onValueChange={(value) => setNoteCount(value[0])} 
						/>
						<p className="w-14 max-sm:text-sm">{noteCount}</p>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<p className="w-24 max-sm:text-sm">Tempo:</p>
					<div className="w-4/6 flex items-center gap-2">
						<Slider
						className="w-full"
							disabled={isPlaying}
							min={0} max={10}
							defaultValue={[7]}
							onValueChange={(value) => setTempo(value[0]/10)} 
							/>
						<p className="w-14 max-sm:text-sm">{tempo == 0? <GiPerspectiveDiceSixFacesRandom /> : tempo}</p>
					</div>
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
	"/notes/violin/A4.mp3",
	"/notes/violin/A5.mp3",
	"/notes/violin/A6.mp3",
    "/notes/violin/C4.mp3",
    "/notes/violin/C5.mp3",
    "/notes/violin/C6.mp3",
    "/notes/violin/E4.mp3",
    "/notes/violin/E5.mp3",
    "/notes/violin/E6.mp3",
    "/notes/violin/G4.mp3",
    "/notes/violin/G5.mp3",
    "/notes/violin/G6.mp3",
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