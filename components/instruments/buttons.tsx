import React from 'react'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import { Audio } from '@/types/audio'

export default function Buttons({ audios, index }: {
	audios: Audio[],
	index: number
}) {
	return (
		<div className='flex flex-col gap-2 mt-4'>
			<p className='text-sm text-center'>Note {index + 1}</p>
			<ToggleGroup type="single">
				<ToggleGroupItem value="A" >A</ToggleGroupItem>
				<ToggleGroupItem value="A#">A#</ToggleGroupItem>
				<ToggleGroupItem value="B" >B</ToggleGroupItem>
				<ToggleGroupItem value="C" >C</ToggleGroupItem>
				<ToggleGroupItem value="C#">C#</ToggleGroupItem>
				<ToggleGroupItem value="D" >D</ToggleGroupItem>
				<ToggleGroupItem value="D#">D#</ToggleGroupItem>
				<ToggleGroupItem value="E" >E</ToggleGroupItem>
				<ToggleGroupItem value="F" >F</ToggleGroupItem>
				<ToggleGroupItem value="F#">F#</ToggleGroupItem>
				<ToggleGroupItem value="G" >G</ToggleGroupItem>
				<ToggleGroupItem value="G#">G#</ToggleGroupItem>
			</ToggleGroup>
		</div>
	)
}
