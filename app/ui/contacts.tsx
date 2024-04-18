import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchContacts } from '@/app/lib/data';
import {Button} from '@/app/ui/button';
import Link from 'next/link';

export default async function Contacts({id, setContact} : {id:string, setContact: (contact_id: string) => void}) {
  const users = await fetchContacts(id);

  return (
  <aside className="h-screen">
	<nav className="h-full flex flex-col rounded-lg bg-white border-r shadow-sm items-center">
	 <h2>Contacts</h2>
	 <ul className="flex-1 px-3 bg-gray-50 hover:bg-gray-150 rounded-lg" >
	    {users.map((user, i) =>{
	    return (<div key={user.id} className="bg-gray-100">
	    	<p text-gray-500>{user.name}</p>
	    </div>)})}
	 </ul>
	</nav>
  </aside>
  );

}
