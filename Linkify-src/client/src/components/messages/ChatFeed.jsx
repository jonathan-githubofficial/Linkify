import React from 'react'
import ChatItem from './ChatItem'


function ChatFeed(props) {

    const { conversations, selectChat, removeChatItem } = props;

    return (
        <div>

            {
                 conversations.map((conversation) => {
                    return (
                        <ChatItem avatar={conversation.avatar} 
                                  user={conversation.user} 
                                  lastmessage={conversation.messages[conversation.messages.length - 1].message} 
                                  time={conversation.messages[conversation.messages.length - 1].time} 
                                  selectChat={selectChat} 
                                  removeChatItem={removeChatItem}/>)
                })
            }

        </div>
    )
}

export default ChatFeed