import { NextResponse } from "next/server";


export async function GET(req: Request) {
	return new NextResponse(JSON.stringify({ ok: true }), { status: 200 });  
}