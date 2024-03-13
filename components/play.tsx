import { Audio } from "@/types/audio";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { CiPlay1 } from "react-icons/ci";
import { Bars } from 'react-loader-spinner'
import { getCredits, addCredits } from "@/app/api/mongodb/userapi";

export default function Play({ audios, isPlaying, setIsPlaying, id, setCredits, credits }: { 
	audios: Audio[] | undefined,
	isPlaying: boolean,
	setIsPlaying: Dispatch<SetStateAction<boolean>>,
	id: string | undefined,
	setCredits: Dispatch<SetStateAction<number>>,
	credits: number
}) {
	async function minusCredits() {
		if (id == null) {
			console.log("Could not get user id");
			return;
		}
		await addCredits(id, -1);
		setCredits(await getCredits(id))
	}
	async function onPlay() {
		minusCredits();

		if (audios == undefined || audios == null)
			return;
		if (id == undefined) {
			console.error("Error getting user id");
			return;
		}

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
			disabled={isPlaying || credits <= 0}
			onClick={onPlay}		
			variant={"ghost"}

			className="text-3xl">
			{isPlaying ?
				<Bars width={30} /> :
				<>
				<CiPlay1 className="text-3xl relative "/>
					<p className=" absolute translate-x-[70%] text-sm text-secondary">Costs 1 credits</p>
				</>
			}
		</Button>

	)
}