//Author: Daria Koroleva ID:40096402
import React from 'react'
import ChatItem from './ChatItem'


function ChatFeed(props) {

        const { conversations, selectChat, removeChatItem } = props;

        if (conversations.length === 0) {
            return null;
        }

        return (
            <div>

                {
                    conversations.map((conversation) => {
                        return (
                            <div key={conversation.user}>
                                <ChatItem avatar={conversation.avatar}
                                    user={conversation.user}
                                    name={conversation.name}
                                    lastmessage={conversation.messages[conversation.messages.length - 1].message}
                                    time={conversation.messages[conversation.messages.length - 1].time}
                                    selectChat={selectChat}
                                    removeChatItem={removeChatItem} />
                            </div>
                        )
                    })
                }

            </div>
        )
}

export default ChatFeed