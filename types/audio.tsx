export class Audio {
	howl: Howl;
	delay: number;
	note: string;
	constructor(howl: Howl, delay: number, note: string) {
		this.howl = howl;
		this.delay = delay;
		this.note = note;
	}
}