"use client"

const source = new Audio();
export default function PlaySound(src: string) {
	source.src = src;
	source.currentTime = 0;
	source.play();
}