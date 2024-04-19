"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/app/ui/button";
import { Message } from "@/app/lib/definitions";

export default function ChatInput({
  onSend,
  user_id,
  other_id,
}: {
  onSend: (msg: Message) => void;
  user_id: string;
  other_id: string;
}) {
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    if (message.trim() !== "") {
      onSend({
        message: message,
        receiver_id: other_id,
        sender_id: user_id,
        time_sent: new Date().toISOString()
      });
      setMessage("");
    }
  };

  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={handleChange}
	className="rounded-xl text-gray-500"
      />
      <Button type="submit" onClick={handleSubmit}>Send</Button>
    </div>
  );
}
