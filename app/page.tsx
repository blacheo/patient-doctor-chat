import Image from "next/image";
import Link from 'next/link';
import Users from '@/app/ui/Users';
import { fetchUsers } from '@/app/lib/data';

export default async function Home() {
	const users = await fetchUsers();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
	<h1>Select a User</h1>
	<Users path="contacts" text="Chat Using This Account" users={users}/>
   </main>
  );
}
