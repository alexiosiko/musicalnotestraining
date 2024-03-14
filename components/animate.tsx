import React from "react"
import { motion, useAnimate } from "framer-motion"; 

export default function AnimatedDiv({ children, className, direction, style, delay }: {
	children?: React.ReactNode;
	direction: string;
	style?: any,
	className?: string,
	delay?: number
}) {
	const [scope, animate] = useAnimate();
	let initial: any;
	switch (direction) {
		case "up": initial = { y: -25, opacity: 0 }; break;
		case "left": initial = { x: -50, opacity: 0 }; break;
		case "right": initial = { x: 50, opacity: 0 }; break;
		case "down": initial = { y: 25, opacity: 0 }; break;
		default: break;
	}
	return (
		<motion.div
		style={style}
		className={`${className}`}
			ref={scope}
			initial={initial}
			onViewportEnter={() => animate(scope.current, { x: 0, y:0, opacity: 100 }, { delay: delay })}
		>
			{children}
		</motion.div>
	)
}