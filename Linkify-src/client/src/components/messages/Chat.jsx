import React, { useState } from 'react'
import ChatHeader from './ChatHeader';
import Message from './Message'
import MessageSender from './MessageSender';

function Chat(props) {

    const { conversation, addMessage } = props;

    if (!conversation) {
        return <div></div>;
    }    

    return (
        <div>
            <ChatHeader avatar={conversation.avatar} user={conversation.user} title={conversation.title} />
            <div className='p-2'>
                {conversation.messages.map((m) => {
                    return (
                        <Message message={m} />
                    )
                }
                )}
            </div>

            <div className='border mt-4'>
                <MessageSender receiver={conversation.user} addMessage={addMessage} />
            </div>
        </div>
    )
}

export default Chat