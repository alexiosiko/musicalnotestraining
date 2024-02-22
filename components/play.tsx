import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

export default function Play({ audios, isPlaying, setIsPlaying }: { 
	audios: HTMLAudioElement[] | undefined,
	isPlaying: boolean,
	setIsPlaying: Dispatch<SetStateAction<boolean>>
}) {
	async function onPlay() {
		if (audios == undefined || audios == null)
			return;
		setIsPlaying(true);

		// Wait 0.2 secs for to start
		await new Promise((resolve) => setTimeout(resolve, 200));
		
		for (let i = 0; i < audios.length; i++) {
			audios[i].currentTime = 0;
			audios[i].play();
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}
		setIsPlaying(false);
	}
	return (
		<Button 
			className={`w-full h-1/6`}
			disabled={isPlaying}
			onClick={onPlay}>Play
		</Button>

	)
}