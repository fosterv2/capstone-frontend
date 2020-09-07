import React from 'react';
import MessageForm from '../forms/MessageForm';

const MessagesArea = ({ conversation: { id, title, messages }, }) => {

    const orderedMessages = messages => {
        const sortedMessages = messages.sort(
            (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        return sortedMessages.map(message => {
            return <li key={message.id}>{message.text}</li>;
        });
    };

    return (
        <div className="messagesArea">
            <h2>{title}</h2>
            <ul>{orderedMessages(messages)}</ul>
            <MessageForm conversation_id={id} />
        </div>
    );
};

export default MessagesArea;