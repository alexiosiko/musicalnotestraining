import { Audio } from "@/types/audio";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function stopCurrentAudios(audios: Audio[]) {
	// Stop all current audios
	for (let i = 0; i < audios.length; i++) {
		audios[i].howl.stop();
	}
}

export function formateNote(src: string) {

	// Split the file path by "/"
	const parts = src.split("/");

	// Take the last part which contains the note filename
	const noteFilename = parts[parts.length - 1];

	// Extract the note from the filename
	let note = noteFilename.split(".")[0];

	// Replace s with #
	note = note.replaceAll('s', '#');

	return note;
}
