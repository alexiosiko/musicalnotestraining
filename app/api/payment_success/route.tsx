import { NextResponse } from "next/server";

export default function Routee() {
	
	return (
		<div>
	sucecess
	</div>
	)
}

export async function GET(req: Request) {
	return new NextResponse(JSON.stringify({ ok: true }), { status: 200 });  
}