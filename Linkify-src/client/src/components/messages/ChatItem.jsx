//Messages
//Author: Daria Koroleva
//Created: March 5,2023
//Description: Show a description of a specific user receiver

import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'

function ChatItem(props) {

    const { avatar, user, name,lastmessage, time, selectChat, removeChatItem } = props;

    return (

        <div className="w-full m-auto p-2 shadow-lg cursor-pointer" onClick={() => selectChat(user)}>
            <div className="container inline-flex justify-between">
                <div className='w-1/8 avatar'>
                    <div class="w-12 h-12 rounded-full">
                        <img src={avatar} />
                    </div>
                </div>
                <div className="flex-grow p-2">
                    <p className="lg:text-md font-semibold">{name}</p>
                    <p className="lg:text-md">{lastmessage}</p>
                </div>
                <div className="w-1/8 flex-none">
                    <p className="text-xs opacity-50">{time}</p>
                    <div className='p-2 cursor-pointer' onClick={(e)=>{
                        e.stopPropagation();
                        removeChatItem(user);
                    }}>
                        <FaTrashAlt />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatItem