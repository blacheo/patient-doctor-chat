import Image from "next/image";
import Link from 'next/link';
import Users from '@/app/ui/Users';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
	<h1>Select a User</h1>
	<Users/>
   </main>
  );
}
