import { Message } from "@/app/lib/definitions";

function Chat({ user_name, other_name, message, user_id }: { user_name:string, other_name:string, message: Message; user_id: string }) {
  return (
    <div className="bg-white text-gray-500 px-4 rounded-xl justify">
      <p>{message.sender_id === user_id ? user_name : other_name}</p>
      <div className="flex gap-2.5">
        <p>{message.message}</p>
        <p className="text-gray-400">Sent at {message.time_sent}</p>
      </div>
    </div>
  );
}

export default function ChatWindow({
  messages,
  user_id,
  user_name,
  other_name,
}: {
  messages: Array<Message>;
  user_id: string;
  user_name:string;
  other_name:string;
}) {
  return (
    <div className="grid-cols-1 gap-7">
      {messages.map((message, i) => {
        return (
          <div key={i}>
            <Chat user_name={user_name} other_name={other_name} message={message} user_id={user_id} />
          </div>
        );
      })}
    </div>
  );
}
