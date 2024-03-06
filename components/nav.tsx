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
			<div className="flex gap-6 relative items-center ">
				<Button className="p-4">
					<Link href="/plans" >Plans</Link>
				</Button>
				{user ?
					<UserButton afterSignOutUrl="/" /> 
					:
					<SignInButton afterSignInUrl="/" />
				}
			</div>
		</div>		
	);
}