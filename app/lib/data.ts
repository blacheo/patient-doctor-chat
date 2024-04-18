import { sql } from '@vercel/postgres';
import { User, Message } from './definitions';

export async function fetchUsers() {
	try {
		const data = await sql<User>`SELECt * FROM users`;
		return data.rows;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch users.');
	}
}

export async function fetchMessages(receiverID: string, senderID: string) {
	try {
		const data = await sql<Message>`SELECT * FROM message WHERE receiver_id=${receiverID}, sender_id=${senderID}`;
		return data.rows;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch messages.');
	}
}

export async function sendMessage(receiverID: string, senderID:string, message:string) {
	try {
		const data = await sql<Message>`
		INSERT INTO message (receiver_id, sender_id, message, time_sent)
		VALUES (${receiverID}, ${senderID}, ${message}, ${Date.now()})
		`
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to send message.');
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
		`
		return users.rows;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to retrieve aquaintances');
	}
}
