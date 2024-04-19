import Chat from "./chat";
import { Suspense } from "react";
import { fetchUserName } from "@/app/lib/data";

export default async function Home(context: {
  params: { user_id: string; other_id: string };
}) {
  const user_id = context.params.user_id;
  const other_id = context.params.other_id;
  const user_name = await fetchUserName(user_id);

  const other_name = await fetchUserName(other_id);
  return (
    <div>
      <h1>Chat</h1>
      <Suspense fallback={<Loading />}>
        <Chat user_id={user_id} other_id={other_id} user_name={user_name} other_name={other_name} />
      </Suspense>
    </div>
  );
}

function Loading() {
  return <h2>Loading...</h2>;
}
