import { Audio } from "@/types/audio";
import { Dispatch, SetStateAction, useRef } from "react";
import { Button } from "../ui/button";
import { CiPlay1 } from "react-icons/ci";
import { Bars } from 'react-loader-spinner'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
export default function Play({ audios, isPlaying, setIsPlaying }: { 
	audios: Audio[] | undefined,
	isPlaying: boolean,
	setIsPlaying: Dispatch<SetStateAction<boolean>>,
}) {
	const alertDialogTriggerRef = useRef<HTMLButtonElement>(null);
	
	async function onPlay() {
		if (audios == undefined || audios == null)
			return;
	
		// Stop all current audios
		for (let i = 0; i < audios.length; i++)
			audios[i].howl.stop();

		setIsPlaying(true);

		for (let i = 0; i < audios.length; i++) {

			audios[i].howl.volume(1);
			audios[i].howl.play();

			const randomDelay = audios[i].delay;

			await new Promise((resolve) => setTimeout(resolve, randomDelay * 600));
			
			// If NOT last note
			if (i != audios.length - 1) {
				// Stop current note
				audios[i].howl.fade(1, 0, randomDelay * 800);
			} else {
				// If LAST note
				audios[i].howl.fade(1, 0, randomDelay * 800 * 2);
			}

			
			await new Promise((resolve) => setTimeout(resolve, randomDelay * 400));
		}
		setIsPlaying(false);
	}
	return (
		<>
			<AlertDialog>
				<AlertDialogTrigger className="hidden" ref={alertDialogTriggerRef} >Open</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>No connection to internet</AlertDialogTitle>
						<AlertDialogDescription>
							Please connect to your device to the internet, and restart this page.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogAction>Understood</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			<Button
				disabled={isPlaying}
				onClick={onPlay}		
				className="text-3xl"
			>
				{isPlaying ? (
					<Bars width={30} />
				) : (
					<CiPlay1 />
				)}
			</Button>
		</>
	);
}