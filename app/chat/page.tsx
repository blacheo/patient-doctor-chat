'use client'

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Contacts from '@/app/ui/contacts';
import { fetchContacts} from '@/app/lib/data';
import {Button} from '@/app/ui/button';
import Link from 'next/link';

export default function Home() {
    const searchParams = useSearchParams();
    const user_id = searchParams.get('id') ?? "Error";
    const [contact, setContact] = useState<null|string>(null);
    
    function setContact2(contact_id: string) {
    	setContact(contact_id);
    }
    return (
    <div> 
    <h1>Chat Dashboard</h1>
    <aside>
    	<Link href={{pathname: 'newchat', query:{id: `${user_id}`}}}><Button>Start a New Conversation</Button> </Link>
    </aside>
    <Contacts id={user_id} setContact={setContact2} />
    </div>);
}
