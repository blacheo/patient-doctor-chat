'use client'

import { useSearchParams } from 'next/navigation';

export default function Home() {
	const searchParams = useSearchParams();
	const user_id = searchParams.get('id') ?? "Error";
	
	return (
	<div>
	<h1>Choose new contact</h1>
	</div>
	)
}
