"use client"

export default function PlaySound(src: string) {
	new Audio(src).play();
}