import { Button } from "@/components/ui/button";
import PlaySound from "@/hooks/SoundEffect";
import { Dispatch, SetStateAction } from "react";
import { getRandomNote } from "@/components/Notes";
import { Audio } from "@/app/page";

export default function Shuffle({ audios, setAudios, noteCount, setReveal, setIsPlaying, isPlaying }: { 
	audios: Audio[] | undefined,
	setAudios: Dispatch<SetStateAction<Audio[] | undefined>>
	noteCount: number,
	setReveal: Dispatch<SetStateAction<boolean>>,
	setIsPlaying: Dispatch<SetStateAction<boolean>>
	isPlaying: boolean,
}) {
	function killAudios() {
		audios?.forEach((audio: any) => {
			audio.howl.stop();
			audio.howl._src = "";
		})
		setIsPlaying(true);
	}
	function onShuffle() {
		PlaySound("/sounds/button.wav");

		if (audios == null) 
			return;

		killAudios();

		setReveal(false);

		const delay = Math.random() * (750 - 200) + 200;

		let newAudios = Array.from({ length: noteCount }, () => new Audio(
			new Howl({src: getRandomNote()}), delay
		));

		setAudios(newAudios);

		setIsPlaying(false);
	}
	return (
		<Button 
			disabled={isPlaying}
			className="w-full h-full"
			onClick={onShuffle}>Shuffle</Button>
		
	)
}