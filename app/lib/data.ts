import { sql } from "@vercel/postgres";
import { User, Message } from "./definitions";

export async function fetchUserName(user_id: string) {
  try {
    const data = await sql`SELECT name FROM users WHERE id = ${user_id}`;
    console.log(data.rows[0].name);
    return data.rows[0].name;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch username.");
  }
}

export async function fetchUsersExclude(user_id: string) {
  try {
    const data = await sql<User>`SELECT * FROM users WHERE id <> ${user_id}`;
    console.log(data.rows);
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users.");
  }
}

export async function fetchUsers() {
  try {
    const data = await sql<User>`SELECt * FROM users`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users.");
  }
}

export async function fetchMessages(user1_id: string, user2_id: string) {
  try {
    const data =
      await sql<Message>`SELECT * FROM message WHERE (receiver_id=${user1_id} AND sender_id=${user2_id}) OR (receiver_id=${user2_id} AND sender_id=${user1_id})`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch messages.");
  }
}

export async function sendMessage(m: Message) {
  try {
    const data = await sql<Message>`
		INSERT INTO message (receiver_id, sender_id, message, time_sent)
		VALUES (${m.receiver_id}, ${m.sender_id}, ${m.message}, ${m.time_sent})
		`;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to send message.");
  }
}

// get users who you have a conversation with
export async function fetchContacts(id: string) {
  try {
    //console.log(id);
    const users = await sql<User>`
		SELECT * FROM users,
		(SELECT receiver_id AS id2 FROM message WHERE sender_id=${id}
		UNION
		SELECT sender_id AS id2 FROM message WHERE receiver_id=${id}) WHERE id2 = id;  
		`;
    return users.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to retrieve aquaintances");
  }
}
