"use client";

import { useState, useEffect } from "react";
import ChatWindow from "@/app/ui/chatwindow";
import ChatInput from "@/app/ui/chatinput";
import { Message } from "@/app/lib/definitions";
import { useSearchParams } from "next/navigation";

export default function Chat({
  user_id,
  other_id,
  user_name,
  other_name,
}: {
  user_id: string;
  other_id: string;
  user_name: string;
  other_name: string;
}) {
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    fetch(`/api/chat/${user_id}/${other_id}`)
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error("Error fetching messages:", error));
  }, [user_id, other_id]);

  const sendMessage = (message: Message) => {
    fetch(`/api/chat/${user_id}/${other_id}`, {
      method: "POST",
      body: JSON.stringify({ message }),
    });
    setMessages([...messages, message]);
  };

  return (
    <div>
      <ChatWindow
        messages={messages}
        user_id={user_id}
        user_name={user_name}
        other_name={other_name}
      />
      <ChatInput onSend={sendMessage} user_id={user_id} other_id={other_id} />
    </div>
  );
}
