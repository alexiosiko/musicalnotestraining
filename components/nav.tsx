import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function Nav() {
	const user = await currentUser();
	return (
		<div className="p-4 flex outline outline-1 justify-between items-center w-full">
			<Link href="/">
				Musical Notes
			</Link>
			<div className="flex gap-6 relative ">
				{user ?
					<UserButton afterSignOutUrl="/" /> :
					<SignInButton />
				}
				<Button className="p-4">
					<Link href="/" >Plans</Link>
				</Button>
			</div>
		</div>		
	);
}