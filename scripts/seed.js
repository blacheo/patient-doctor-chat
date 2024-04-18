const { db } = require('@vercel/postgres');
const {
  user_list, messages
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedMessages(client) {
	try {
		await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
		const createTable = await client.sql`
		CREATE TABLE IF NOT EXISTS message (
		receiver_id UUID,
		sender_id UUID,
		message TEXT,
		time_sent TIMESTAMP NOT NULL
		);
		`;

		console.log(`Created "messages" table`);

    		const insertedMessages = await Promise.all(
      		messages.map(async (message) => {
        	return client.sql`
        	INSERT INTO message (receiver_id, sender_id, message, time_sent)
        	VALUES (${message.receiver_id}, ${message.sender_id}, ${message.message}, ${message.time_sent});
      `;
      }),
    );

    console.log(`Seeded ${insertedMessages.length} messages`);

    return {
      createTable,
      messages: insertedMessages,
    };
  } catch (error) {
    console.error('Error seeding messages:', error);
    throw error;
  }

}

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "user" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
	is_doctor BOOL NOT NULL
      );
    `;

    console.log(`Created "users" table`);
    // Insert data into the "user" table
    const insertedUsers = await Promise.all(
      user_list.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password, is_doctor)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.is_doctor})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}



async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedMessages(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
