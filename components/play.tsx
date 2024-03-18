import { Audio } from "@/types/audio";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Button } from "./ui/button";
import { CiPlay1 } from "react-icons/ci";
import { Bars } from 'react-loader-spinner'
import { addCredits, findCustomerAndAddCredits, getCredits } from "@/app/api/customerapi";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
export default function Play({ audios, isPlaying, setIsPlaying, id: userId, setCredits, credits }: { 
	audios: Audio[] | undefined,
	isPlaying: boolean,
	setIsPlaying: Dispatch<SetStateAction<boolean>>,
	id: string | undefined,
	setCredits: Dispatch<SetStateAction<number>>,
	credits: number
}) {
	const alertDialogTriggerRef = useRef<HTMLButtonElement>(null);
	
	async function minusCredits() {
		if (userId == null) {
			console.log("Could not get user id");
			return;
		}
		const res = await findCustomerAndAddCredits(userId, -1)
		if (res.ok && res.credits !== undefined) 
			setCredits(res.credits);
		else {
			alert("Bad shit happened setting and getting user credits from stripe");
			setCredits(0);
			throw Error("Couldn't reduce credits from user");
		}
	}
	async function onPlay() {
		if (navigator.onLine == false) {
			alertDialogTriggerRef.current?.click();
			return;
		}
		try {
			minusCredits();

			if (audios == undefined || audios == null)
				return;
			if (userId == undefined) {
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
			
		} catch (e) {
			console.error(e);
			alert("Error connecting to server...");
			setIsPlaying(false);
		}
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
				disabled={isPlaying || credits < 0}
				onClick={onPlay}		
				variant={"ghost"}
				className="text-3xl"
			>
				{isPlaying ? (
					<Bars width={30} />
				) : (
					<>
						<CiPlay1 className="text-3xl relative" />
						<p className="absolute translate-x-[70%] text-sm text-secondary">Costs 1 credits</p>
					</>
				)}
			</Button>
		</>
	);
}