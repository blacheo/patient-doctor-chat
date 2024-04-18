'use client'

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Contacts from '@/app/ui/contacts';
import { fetchContacts} from '@/app/lib/data';
import {Button} from '@/app/ui/button';
import Link from 'next/link';
import {Suspense} from 'react';

function ConversationSideBar() {
    	const [contact, setContact] = useState<null|string>(null);
	const searchParams = useSearchParams();
    	const user_id = searchParams.get('id') ?? "Error";
	function setContact2(contact_id: string) {
   	 	setContact(contact_id);
    	}
	return (
	<div>
	<Link href={{pathname: 'newchat', query:{id: `${user_id}`}}}>
	<Button>Start a New Conversation</Button>
	</Link>
    	<Contacts id={user_id} setContact={setContact2} />
	</div>
)

}

export default function Home() {
        
    
    return (
    <div> 
    <h1>Chat Dashboard</h1>

    <Suspense>
    <ConversationSideBar/>
    </Suspense>
    </div>);
}
