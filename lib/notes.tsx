const bouzoukiNotes = [
	"/notes/bouzouki/A.mp3",
    "/notes/bouzouki/As.mp3",
    "/notes/bouzouki/B.mp3",
    "/notes/bouzouki/C.mp3",
    "/notes/bouzouki/Cs.mp3",
    "/notes/bouzouki/D.mp3",
    "/notes/bouzouki/Ds.mp3",
    "/notes/bouzouki/E.mp3",
    "/notes/bouzouki/F.mp3",
    "/notes/bouzouki/Fs.mp3",
    "/notes/bouzouki/G.mp3",
    "/notes/bouzouki/Gs.mp3",
]

export function getRandomBouzoukiNote() {
	const randomIndex = Math.floor(Math.random() * bouzoukiNotes.length);
	return bouzoukiNotes[randomIndex];
}

const pianoNotes = [
	"/notes/piano/a3.mid",
    "/notes/piano/As3.mid",
    "/notes/piano/b3.mid",
    "/notes/piano/c3.mid",
    "/notes/piano/Cs3.mid",
    "/notes/piano/d3.mid",
    "/notes/piano/Ds3.mid",
    "/notes/piano/e3.mid",
    "/notes/piano/f3.mid",
    "/notes/piano/Fs3.mid",
    "/notes/piano/g3.mid",
    "/notes/piano/Gs3.mid",
]

export function getRandomPianoNote() {
	const randomIndex = Math.floor(Math.random() * pianoNotes.length);
	console.log("returing "+ pianoNotes[randomIndex])
	return pianoNotes[randomIndex];
}