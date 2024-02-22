import { Button } from "@/components/ui/button";
import PlaySound from "@/hooks/SoundEffect";
import { Dispatch, SetStateAction } from "react";
import { getRandomNote } from "@/components/Notes";

export default function Shuffle({ audios, setAudios, noteCount, setReveal, setIsPlaying }: { 
	audios: HTMLAudioElement[] | undefined,
	setAudios: Dispatch<SetStateAction<HTMLAudioElement[] | undefined>>
	noteCount: number,
	setReveal: Dispatch<SetStateAction<boolean>>,
	setIsPlaying: Dispatch<SetStateAction<boolean>>
}) {
	function stopAudios() {
		audios?.forEach(audio => {
			audio.currentTime = 0;
			audio.pause;
			audio.src = "";
		})
		setIsPlaying(false);
	}
	function onShuffle() {
		PlaySound("/sounds/button.wav");

		if (audios == null) 
			return;

		stopAudios();

		setReveal(false);

		let newAudios = Array.from({ length: noteCount }, () => new Audio(getRandomNote()));


		setAudios(newAudios);
	}
	return (
		<Button className="w-full h-1/6" onClick={onShuffle}>Shuffle</Button>
		
	)
}