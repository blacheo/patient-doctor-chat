import React, { useState } from 'react';

const MessageForm = () => {
    const [message, setMessage] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            const client = await pool.connect();
            const result = await client.query('INSERT INTO messages (text) VALUES ($1)', [message]);
            client.release();
            setMessage('');
        } catch (err) {
            console.error('Error executing query', err);
        }
    };

    return (
        <form onSubmit={sendMessage}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default MessageForm;

