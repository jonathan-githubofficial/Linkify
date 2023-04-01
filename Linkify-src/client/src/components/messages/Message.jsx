//Messages
//Author: Daria Koroleva
//Created: March 5,2023
//Description: Component to render a message
import React, { useState } from 'react'
import Attachment from './Attachment';
import MessageOptions from './MessageOptions';


function Message(props) {

    const { message, removeMessage, selectReport} = props;
    const [isReportedMessageVisible, setIsReportedMessageVisible] = useState(false);

    function showReportedMessage() {
        setIsReportedMessageVisible(true);
    }

    function hideReportedMessage() {
        setIsReportedMessageVisible(false);
    }


    return (
        <div>
            {(() => {

                if (message.position === "start" && message.reportType !== null && !isReportedMessageVisible) {
                    return (
                        <div className="alert shadow-lg bg-red-200">
                            <div>
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={message.avatar} />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold">Message reported!</h3>
                                    <div className="text-xs">Content hidden</div>
                                </div>
                            </div>
                            <div className="flex-none">
                                <button onClick={showReportedMessage} className="btn btn-sm">View</button>
                            </div>
                        </div>
                    )
                }
                else if (message.position === "start" && message.reportType !== null && isReportedMessageVisible) {
                    return (
                        <div className="alert shadow-lg">
                        <div className="chat chat-start">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img src={message.avatar} />
                                </div>
                            </div>
                            <div className="chat-header">
                                {message.name}
                                <time className="text-xs opacity-50">{message.time}</time>
                            </div>
                            <div className="flex items-center w-full">
                                <div className="chat-bubble flex-grow">
                                    {message.message}
                                    <Attachment attachments={message.attachments}/>
                                </div>
                                <div className="flex-none ml-2">
                                    <button onClick={hideReportedMessage} className="btn btn-sm">Hide</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    )
                }
                else if (message.position === "start") {
                    return (
                        <div className="chat chat-start">
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
                                <div className="chat-bubble">
                                    {message.message}  
                                    <Attachment attachments={message.attachments}/>
                                </div>

                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <MessageOptions
                                        id={message.id}
                                        canReport={true}
                                        selectReport={selectReport}
                                        removeMessage={removeMessage} />
                                </div>
                            </div>                            
                        </div>
                         
                    )
                }
                else {
                    return (
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
                                <div className="chat-bubble">
                                    {message.message}
                                    <Attachment attachments={message.attachments}/>  
                                </div>
                            </div>
                        </div>

                    )
                }
            })()}

        </div>
    )
}

export default Message