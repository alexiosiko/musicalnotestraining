import { Button } from "@/components/ui/button";
import { Audio } from "@/types/audio";
import { Dispatch, SetStateAction } from "react";

export default function Play({ audios, isLinear, isPlaying, setIsPlaying }: { 
	audios: Audio[] | undefined,
	isPlaying: boolean,
	setIsPlaying: Dispatch<SetStateAction<boolean>>,
	isLinear: boolean
}) {
	async function onPlay() {
		if (audios == undefined || audios == null)
			return;
		setIsPlaying(true);

		for (let i = 0; i < audios.length; i++) {
			audios[i].howl.play();

			const randomDelay = isLinear ? 750 : audios[i].delay;

			await new Promise((resolve) => setTimeout(resolve, randomDelay));
		}
		setIsPlaying(false);
	}
	return (
		<Button 
			className={`w-full h-full`}
			disabled={isPlaying}
			onClick={onPlay}>Play
		</Button>

	)
}