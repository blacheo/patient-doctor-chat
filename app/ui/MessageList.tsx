// MessageList.js
import React, { useState, useEffect } from 'react';

const MessageList = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const client = await pool.connect();
                const result = await client.query('SELECT * FROM messages ORDER BY created_at DESC');
                setMessages(result.rows);
                client.release();
            } catch (err) {
                console.error('Error executing query', err);
            }
        };
        fetchMessages();
    }, []);

    return (
        <div>
            {messages.map((msg) => (
                <div key={msg.id}>
                    <p>{msg.text}</p>
                </div>
            ))}
        </div>
    );
};

export default MessageList;

