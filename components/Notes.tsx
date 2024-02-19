import { randomInt } from "crypto";

export const Notes = [
	"/notes/A.mp3",
    "/notes/As.mp3",
    "/notes/B.mp3",
    "/notes/C.mp3",
    "/notes/Cs.mp3",
    "/notes/D.mp3",
    "/notes/Ds.mp3",
    "/notes/E.mp3",
    "/notes/F.mp3",
    "/notes/Fs.mp3",
    "/notes/G.mp3",
    "/notes/Gs.mp3",
]

export function getRandomNote() {
	const randomIndex = Math.floor(Math.random() * Notes.length);
	return Notes[randomIndex];
}
export function pathToNote(path: string): string {
	// http://localhost:3000/notes/A.mp3
	// let str = path.substring(path.length - 6, path.length);
	// str = str.replaceAll('/', '');
	// str = str.replaceAll(".mp3", '');
	return path;
}