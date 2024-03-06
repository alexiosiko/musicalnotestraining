import { Button } from "@/components/ui/button";
import { LuShuffle } from "react-icons/lu";

export default function Shuffle({ shuffle, isPlaying }: { 
	shuffle:  () => void,
	isPlaying: boolean,
}) {
	
	
	return (
		<Button 
			variant={"ghost"}
			disabled={isPlaying}
			className="text-3xl"
			onClick={shuffle}>
				<LuShuffle />
		</Button>
		
	)
}