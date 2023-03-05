import React, { useState } from 'react';
import { Helmet } from 'react-helmet'
import Chat from '../components/messages/Chat';
import ChatFeed from '../components/messages/ChatFeed';
import { FaArrowLeft } from 'react-icons/fa';


function Messages() {

  const [conversations, setConversations] = useState([
    {
      avatar: "/images/avatar2.jpg", user: "Bunny", title: "Software Engineer", messages: [
        { id: 1, avatar: "/images/avatar1.jpg", time: "12:40", user: "Monkey", message: "You were the Chosen One!", position: "start" },
        { id: 2, avatar: "/images/avatar2.jpg", time: "12:41", user: "Bunny", message: "For what?", position: "end" },
        { id: 3, avatar: "/images/avatar1.jpg", time: "12:43", user: "Monkey", message: "For a new amazing opportunity at the zoo.", position: "start" },
        { id: 4, avatar: "/images/avatar1.jpg", time: "12:45", user: "Monkey", message: " Are you interested?", position: "start" },
        { id: 5, avatar: "/images/avatar2.jpg", time: "12:46", user: "Bunny", message: "Yes, I'll send you my CV :)", position: "end" },
        { id: 6, avatar: "/images/avatar1.jpg", time: "12:45", user: "Monkey", message: "Don't forget to add cover letter", position: "start" },
        { id: 7, avatar: "/images/avatar2.jpg", time: "12:46", user: "Bunny", message: "Thank you for reaching out", position: "end" }
      ]
    },
    {
      avatar: "/images/avatar3.jpg", user: "Cow", title: "QA Analyst", messages: [
        { id: 1, avatar: "/images/avatar1.jpg", time: "12:40", user: "Monkey", message: "Good afternoon Cow,how is the backend implementation?", position: "start" },
        { id: 2, avatar: "/images/avatar3.jpg", time: "12:41", user: "Cow", message: "It is done", position: "end" },
        { id: 3, avatar: "/images/avatar1.jpg", time: "12:43", user: "Monkey", message: "I am not seeing any changes", position: "start" },
        { id: 4, avatar: "/images/avatar1.jpg", time: "12:45", user: "Monkey", message: "Can you double check please?", position: "start" },
        { id: 5, avatar: "/images/avatar3.jpg", time: "12:46", user: "Cow", message: "Oh wait, I found a bug.", position: "end" },
        { id: 6, avatar: "/images/avatar1.jpg", time: "12:45", user: "Monkey", message: "Would you be able to fix it before deadline?", position: "start" },
        { id: 7, avatar: "/images/avatar3.jpg", time: "11:50", user: "Cow", message: "Absolutely", position: "end" }
      ]
    },
    {
      avatar: "/images/avatar4.jpg", user: "Bear", title: "CEO of the Zoo", messages: [
        { id: 1, avatar: "/images/avatar1.jpg", time: "12:40", user: "Monkey", message: "Hello Bear.", position: "start" },
        { id: 2, avatar: "/images/avatar4.jpg", time: "12:41", user: "Bear", message: "Hello, where is my promissed honey?", position: "end" },
        { id: 3, avatar: "/images/avatar1.jpg", time: "12:43", user: "Monkey", message: "In the zoo, waiting for you.", position: "start" },
        { id: 4, avatar: "/images/avatar1.jpg", time: "12:45", user: "Monkey", message: "Are you interested?", position: "start" },
        { id: 5, avatar: "/images/avatar4.jpg", time: "12:46", user: "Bear", message: "Yes, honey is my favorite thing is the whole world", position: "end" },
        { id: 6, avatar: "/images/avatar4.jpg", time: "12:45", user: "Bear", message: "I need many many jars of honey.", position: "end" }
      ]
    },
    {
      avatar: "/images/avatar5.jpg", user: "Panda", title: "HR director", messages: [
        { id: 1, avatar: "/images/avatar5.jpg", time: "12:40", user: "Panda", message: "Hello Monkey,how are you?I hear you need help, but i am currently out of the office.", position: "end" },
        { id: 2, avatar: "/images/avatar1.jpg", time: "12:41", user: "Monkey", message: "Hello, yes, when are you back?", position: "start" },
        { id: 3, avatar: "/images/avatar1.jpg", time: "12:43", user: "Monkey", message: "I just want to complain about Cow.", position: "start" },
        { id: 4, avatar: "/images/avatar1.jpg", time: "12:45", user: "Monkey", message: "I heard he is bulling Fox", position: "start" },
        { id: 5, avatar: "/images/avatar5.jpg", time: "12:46", user: "Panda", message: "Ok, I will deal with it, when I am back from my vacation", position: "end" }
      ]
    },
    {
      avatar: "/images/avatar6.jpg", user: "Fox", title: "Developer", messages: [
        { id: 1, avatar: "/images/avatar6.jpg", time: "12:40", user: "Fox", message: "Did you mentioned anything to Panda?Because he messaged me", position: "end" },
        { id: 2, avatar: "/images/avatar1.jpg", time: "12:41", user: "Monkey", message: "Yes, i told him about the Mad Cow", position: "start" },
        { id: 3, avatar: "/images/avatar6.jpg", time: "12:43", user: "Fox", message: "Mad Cow axaxaxa", position: "end" }
      ]
    }
  ]);

  const [userSelected, setUserSelected] = useState(conversations && conversations.length > 0 ? conversations[0].user : '');
  const [showChatFeed, setShowChatFeed] = useState(true);



  function selectChat(user) {    
    setUserSelected(user);
    mobileToggle();
  }

  function mobileToggle() {
    setShowChatFeed(!showChatFeed);
  }

  function removeChatItem(user) {
    const newConversations = conversations.filter((c) => c.user !== user);
    setConversations(newConversations);

    if (userSelected == user && newConversations.length > 0) {      
      setUserSelected(newConversations[0].user);
    }
  }

  function getSelectedConversation() {
    return conversations.find(conversation => conversation.user === userSelected);
  }

  function addMessageold(newMessage){
    const conversation = conversations.find((c) => c.user == newMessage.user);
    conversation.messages = [...conversation.messages, newMessage];
    let newConversations = conversations.filter((c) => c.user !== newMessage.user);
    newConversations = [conversation,...newConversations];
    setConversations(newConversations);
  }

  function addMessage(messageText, receiver){

    const currentUser = "Monkey";
    const conversation = conversations.find((c) => c.user === receiver);
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    const newMessage = {
        id: conversation.messages.length + 1,
        avatar: "/images/avatar1.jpg",
        time: time, 
        user: currentUser,
        message: messageText,
        position: "start"
    };

    conversation.messages = [...conversation.messages, newMessage];
    const newConversations = [conversation,...conversations.filter((c) => c.user !== receiver)];    
    setConversations(newConversations);
  }


  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Messages</title>
      </Helmet>

      
      <div className={`${(conversations.length > 0) ? 'hidden' : ''} mt-40`}>
        <h1 className="font-bold text-center">You have no messages</h1> 
      </div> 

      <div className={`${(conversations.length === 0) ? 'hidden' : ''} w-full sm:w-3/4 md:w-1/2 border m-auto`}>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className={`${showChatFeed ? 'hidden' : ''} sm:hidden p-2`} style={{ fontSize: "24px" }} onClick={mobileToggle}>
            <FaArrowLeft />
          </div>

          <div className={`${!showChatFeed ? 'hidden' : ''} sm:block  col-span-1 border`}>
            <ChatFeed conversations={conversations} selectChat={selectChat} removeChatItem={removeChatItem} />
          </div>

          <div className={`${showChatFeed ? 'hidden' : ''}  sm:block col-span-1 border`}>            
            <Chat conversation={getSelectedConversation()} addMessage={addMessage} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages

