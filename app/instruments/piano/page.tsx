"use client"

import InstrumentPage from '@/components/instruments/instrumentpage'
import React from 'react'

export default function index() {
  return (
	<InstrumentPage
		name='Piano'
		getRandomNote={getRandomPianoNote}
		src='url("/images/instruments/piano-1.jpg"' />
	)
}
const pianoNotes = [
	"/notes/piano/a3.mp3",
	"/notes/piano/As3.mp3",
	"/notes/piano/b3.mp3",
	"/notes/piano/c3.mp3",
	"/notes/piano/Cs3.mp3",
	"/notes/piano/d3.mp3",
	"/notes/piano/Ds3.mp3",
	"/notes/piano/e3.mp3",
	"/notes/piano/f3.mp3",
	"/notes/piano/Fs3.mp3",
	"/notes/piano/g3.mp3",
	"/notes/piano/Gs3.mp3",
]
	
function getRandomPianoNote() {
		const randomIndex = Math.floor(Math.random() * pianoNotes.length);
		console.log("returing "+ pianoNotes[randomIndex])
		return pianoNotes[randomIndex];
}
