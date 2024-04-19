import Contacts from "@/app/ui/contacts";
import { fetchUsersExclude } from "@/app/lib/data";
import { Button } from "@/app/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import Users from "@/app/ui/Users";

export default async function Home(
  context: { params: { id: string } }
) {
  console.log(context);
  const id: string = context.params.id;
  console.log(id);

  const users = await fetchUsersExclude(id);

  return (
    <div>
      <h1>Chat Dashboard</h1>
      <Users path="chat" text="Chat" users={users} other={id} />
    </div>
  );
}
