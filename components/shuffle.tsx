import { Button } from "@/components/ui/button";
import PlaySound from "@/hooks/SoundEffect";
import { Dispatch, SetStateAction } from "react";
import { getRandomNote } from "@/components/Notes";

export default function Shuffle({ audios, setAudios, noteCount, setReveal, setIsPlaying, isPlaying }: { 
	audios: Howl[] | undefined,
	setAudios: Dispatch<SetStateAction<Howl[] | undefined>>
	noteCount: number,
	setReveal: Dispatch<SetStateAction<boolean>>,
	setIsPlaying: Dispatch<SetStateAction<boolean>>
	isPlaying: boolean
}) {
	function killAudios() {
		audios?.forEach((audio: any) => {
			audio.stop();
			audio._src = "";
		})
		setIsPlaying(true);
	}
	function onShuffle() {
		PlaySound("/sounds/button.wav");

		if (audios == null) 
			return;

		killAudios();

		setReveal(false);

		let newAudios = Array.from({ length: noteCount }, () => new Howl({
			src: getRandomNote()}
		));

		setAudios(newAudios);

		setIsPlaying(false);
	}
	return (
		<Button 
			disabled={isPlaying}
			className="w-full h-1/6"
			onClick={onShuffle}>Shuffle</Button>
		
	)
}