import { Audio } from "@/types/audio";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { CiPlay1 } from "react-icons/ci";

export default function Play({ audios, isPlaying, setIsPlaying }: { 
	audios: Audio[] | undefined,
	isPlaying: boolean,
	setIsPlaying: Dispatch<SetStateAction<boolean>>,
}) {
	async function onPlay() {
		if (audios == undefined || audios == null)
			return;
		setIsPlaying(true);

		for (let i = 0; i < audios.length; i++) {
			audios[i].howl.play();

			const randomDelay = audios[i].delay;

			await new Promise((resolve) => setTimeout(resolve, randomDelay * 1000));
		}
		setIsPlaying(false);
	}
	return (
		<Button
			disabled={isPlaying}
			onClick={onPlay}		
			variant={"ghost"}

			className="text-3xl">

			<CiPlay1 className="text-3xl"/>
		</Button>

	)
}