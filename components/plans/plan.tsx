import { Button } from "../ui/button";
import { Card } from "../ui/card"
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
	}
}) {
	return (
			<Card className="p-4" >
				<Text className="text-3xl font-bold">{data.header}</Text>
				<Text>$ {data.price} /mo</Text>
				<hr />
				<div className="">
					<div className="flex gap-1 items-center">
						{data.f1 ? <GoCheck /> : <GoX /> }<Text >asd</Text>
					</div>
					<div className="flex gap-1 items-center">
						{data.f2 ? <GoCheck /> : <GoX /> }<Text >asd</Text>
					</div>
					<div className="flex gap-1 items-center">
						{data.f3 ? <GoCheck /> : <GoX /> }<Text >asd</Text>
					</div>
				</div>
				<div className="flex justify-center">
 					<Button >Select</Button>
				</div>
			</Card>

	)
}