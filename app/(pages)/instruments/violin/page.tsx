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
	const [octave, setOctave] = useState<number>(4);

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
	}, [noteCount, tempo, octave])

	function shuffle() {
		if (audios == null) 
			return;
		stopCurrentAudios(audios);
		setIsPlaying(true);
		setReveal(false);
		setIsPlaying(false);
		setAudios(getNewAudios(tempo, noteCount, octave));
	}

	const getNotes = () => _getNotes(audios);

	return (
		<main className=" ml-auto mr-auto h-[85vh] p-4 flex flex-col justify-center gap-24">
			<div className="flex flex-col gap-4 mt-4">
				<p className="text-center">Piano</p>
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
				<div className="flex items-center justify-between">
					<p className="w-24 max-sm:text-sm">Octave#:</p>
					<div className="w-4/6 flex items-center gap-2">
						<Slider
						className="w-full"
							disabled={isPlaying}
							min={4} max={6}
							defaultValue={[4]}
							onValueChange={(value) => setOctave(value[0])} 
							/>
						<p className="w-14 max-sm:text-sm">{octave}</p>
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
	"/notes/violin/A",
    // "/notes/violin/As",
    // "/notes/violin/B",
    "/notes/violin/C",
    // "/notes/violin/Cs",
    // "/notes/violin/D",
    // "/notes/violin/Ds",
    "/notes/violin/E",
    // "/notes/violin/F",
    // "/notes/violin/Fs",
    "/notes/violin/G",
    // "/notes/violin/Gs",
]



function getRandomNote(octave: number) {
	const randomIndex = Math.floor(Math.random() * notes.length);
	const randomNote = notes[randomIndex];
	const str = `${randomNote}${octave}.mp3`;
	return str;

}

function getNewAudios(tempo: number, noteCount: number, octave: number): Audio[] {
	const generateRandomDelay = () => (Math.random() * (750 - 200) + 200) / 1000;

	const generateAudioWithDelay = () => {
		const delay = tempo === 0 ? generateRandomDelay() : tempo;
		const howl = new Howl({ src: getRandomNote(octave) });
		return new Audio(howl, delay);
	};

	return Array.from({ length: noteCount }, generateAudioWithDelay);
}