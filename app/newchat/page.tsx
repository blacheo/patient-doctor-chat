'use client'

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ContactList () {
	const searchParams = useSearchParams();
	const user_id = searchParams.get('id') ?? "Error";
    	return (<div></div>) 
}

export default function Home() {
	
	return (
	<div>
	<h1>Choose new contact</h1>
	</div>
	)
}
