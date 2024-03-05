"use client"

import InstrumentPage from '@/components/instruments/instrumentpage'
import React from 'react'

export default function index() {
  return (
<InstrumentPage
		name='Bouzouki'
		getRandomNote={getRandomBouzoukiNote}
		src='url("/images/instruments/bouzouki-1.png"' />
	)
}

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

function getRandomBouzoukiNote() {
	const randomIndex = Math.floor(Math.random() * bouzoukiNotes.length);
	return bouzoukiNotes[randomIndex];
}