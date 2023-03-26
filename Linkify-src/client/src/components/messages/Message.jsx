//Messages
//Author: Daria Koroleva
//Created: March 5,2023
//Description: Component to render a message
import React from 'react'
import MessageOptions from './MessageOptions';


function Message(props) {

    const { message, removeMessage, selectReport } = props;

    return (
        <div>
            {message.position === "start"
                ? <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src={message.avatar} />
                        </div>
                    </div>
                    <div className="chat-header">
                        {message.name}
                        <time className="text-xs opacity-50">{message.time}</time>
                    </div>
                    <div className="flex items-center group">
                        <div className="chat-bubble">{message.message}</div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <MessageOptions
                                id={message.id}
                                canReport={true}
                                selectReport={selectReport}
                                removeMessage={removeMessage} />
                        </div>
                    </div>
                </div>
                :
                <div className="chat chat-end">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src={message.avatar} />
                        </div>
                    </div>
                    <div className="chat-header">
                        {message.name}
                        <time className="text-xs opacity-50">{message.time}</time>
                    </div>
                    <div className="flex items-center group">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <MessageOptions id={message.id} removeMessage={removeMessage} canReport={false} />
                        </div>
                        <div className="chat-bubble">{message.message}</div>
                    </div>
                </div>
            }

        </div>
    )
}

export default Message