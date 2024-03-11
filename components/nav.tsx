import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function Nav() {
	const user = await currentUser();
	return (
		<div className="p-4 flex outline outline-1 justify-between items-center w-full">
			<Link href="/">
				Musical Notes Training
			</Link>
			<div className="flex gap-6 relative items-center ">
				{user ?
					<UserButton afterSignOutUrl="/" /> 
					:
					<SignInButton afterSignInUrl="/" />
				}
				<Button className="p-4">
					<Link href="/plans" >Plans</Link>
				</Button>
			</div>
		</div>		
	);
}