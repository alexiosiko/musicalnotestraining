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