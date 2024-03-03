import { Button } from "../ui/button";
import Text from "../ui/text"
import { GoCheck, GoX } from "react-icons/go";

export default function Plan({ data }: {
	data: {
		header: string;
		subHeader: string;
		price: string;
		f1: boolean;
		f2: boolean;
		f3: boolean;
		f4: boolean;
		f5: boolean;
	}
}) {
	return (
			<div className="p-4 w-72 outline-1 outline rounded-md flex flex-col gap-6" >
				<Text className="text-xl font-bold">{data.header}</Text>
				<p className="text-3xl">${data.price} <span className="text-xl"> / month</span></p>
				<Button size={'sm'}>Select</Button>
				<div className="flex flex-col gap-2 text-xl">
					<div className="flex gap-1 items-center">
						{data.f1 ? <GoCheck /> : <GoX /> }<Text >asd</Text>
					</div>
					<div className="flex gap-1 items-center">
						{data.f2 ? <GoCheck /> : <GoX /> }<Text >asd</Text>
					</div>
					<div className="flex gap-1 items-center">
						{data.f3 ? <GoCheck /> : <GoX /> }<Text >asd</Text>
					</div>
					<div className="flex gap-1 items-center">
						{data.f4 ? <GoCheck /> : <GoX /> }<Text >asd</Text>
					</div>
					<div className="flex gap-1 items-center">
						{data.f4 ? <GoCheck /> : <GoX /> }<Text >asd</Text>
					</div>
				</div>
			</div>

	)
}