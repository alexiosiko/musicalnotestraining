import Image from "next/image";
import { CardHeader } from "../ui/card";
import { motion } from "framer-motion"
export default function Instrument({ instrument, className, initial, whileInView, index } : {
	instrument:  {
		src: string;
		href: string;
		name: string;
	},
	className?: string,
	initial?: any,
	whileInView?: any,
	index: number
}) {
	return (
		<motion.div transition={{ delay: index / 10 + 0.3}} initial={initial} whileInView={whileInView} >
			<a
				href={instrument.href}
				className={`${className} hover:scale-120 hover:bg-red-400 hover:cursor-pointer transition`}
				>
				<Image className="rounded-full" src={instrument.src} alt={instrument.src} width={165} height={165} />
				<CardHeader className="text-center mt-1">{instrument.name}</CardHeader>
			</a>
		</motion.div>
	)
}