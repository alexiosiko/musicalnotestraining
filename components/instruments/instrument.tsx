import Image from "next/image";
import Link from "next/link";

export default function Instrument({ instrument, className } : {
	instrument:  {
		src: string;
		href: string;
		name: string;
	},
	className?: string
}) {
	return (
		<Link
		href={instrument.href}
			className={`${className} hover:scale-105 hover:rsor-pointer transition`}
			>
			<Image src={instrument.src} alt={instrument.src} width={250} height={250} />
			<h2 className="text-center mt-1">{instrument.name}</h2>
		</Link>
	)
}