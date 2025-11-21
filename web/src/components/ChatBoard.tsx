import React, { useEffect, useState } from 'react';
import { ChatMessage } from '../types';
import { fetchChatMessages, sendMessage } from '../services/api';

const ChatBoard: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');

    useEffect(() => {
        const loadMessages = async () => {
            const fetchedMessages = await fetchChatMessages();
            setMessages(fetchedMessages);
        };

        loadMessages();
    }, []);

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            const message = await sendMessage({ content: newMessage });
            setMessages([...messages, message]);
            setNewMessage('');
        }
    };

    return (
        <div className="chat-board">
            <div className="messages">
                {messages.map((msg) => (
                    <div key={msg.id} className="message">
                        <strong>{(msg as any).sender || msg.senderId}</strong>: {msg.content}
                    </div>
                ))}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatBoard;