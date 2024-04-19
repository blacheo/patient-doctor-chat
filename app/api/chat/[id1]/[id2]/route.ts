import { fetchMessages, sendMessage } from '@/app/lib/data';
import { NextResponse } from "next/server";

export async function GET(request: Request, context: {params : { id1: string, id2:string}}) {
	const { params } = context;
	const messages = await fetchMessages(params.id1, params.id2);
	console.log(params.id1);
	return NextResponse.json(messages);
}

export async function POST(request: Request, context: {params : { id1: string, id2:string}}) {
	const { message, receiver_id, sender_id, time_sent } = await request.json();
	const { params } = context;
	await sendMessage(message);
	return NextResponse.json(message);

}
