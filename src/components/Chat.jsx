import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Chat = () => {

    const {targetUserId}=useParams();
    const [messages,setMessages]=useState([])
    const [newMessage,setNewMessage]=useState("")
    const user=useSelector(store=>store.user)
    const userId=user?._id
    const messagesEndRef = useRef(null);

const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
};
useEffect(() => {
  scrollToBottom();
}, [messages]);


const fetchChatMessages=async()=>{
 const chat=await axios.get(BASE_URL+"/chat/"+targetUserId,{withCredentials:true})
 console.log(chat.data.messages)

 const chatMessages=chat?.data?.messages?.map((msg)=>{
    const {senderId,text}=msg;
    return{
        firstName:senderId.firstName,lastName:senderId.lastName,text

    }
 })
 setMessages(chatMessages)
}


useEffect(()=>{
    fetchChatMessages();
},[])

    useEffect(()=>{
        if(!userId){
            return;
        }
   const socket=createSocketConnection();

   socket.emit('joinChat',{userId,targetUserId})

    socket.on("messageReceiver",({firstName,lastName,text})=>{
        console.log(firstName+":"+text)
        setMessages((messages)=>[...messages,{firstName,lastName,text}])
    })

    return ()=>{
        socket.disconnect();
    }
    },[userId,targetUserId])


    const sendMessage=()=>{
         const socket=createSocketConnection();
        socket.emit("sendMessage",{firstName:user.firstName,lastName:user.lastName,targetUserId,userId,text:newMessage})
        setNewMessage("")
    }

  return (
    <div className="flex flex-col items-center   px-4">
  <div className="w-full max-w-xl border border-white rounded-lg shadow-lg my-24 bg-gray-800">
    {/* Header */}
    <div className="bg-gray-700 p-4 rounded-t-lg text-white text-xl font-bold text-center">
      Chat Room
    </div>

    {/* Chat Messages Area */}
    <div className="h-[500px] overflow-y-auto px-4 py-3 space-y-3">
      {messages.map((msg, index) => {
        const isUser = user.firstName === msg.firstName;
        return (
          <div
            key={index}
            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
          >
            <div className="flex items-end space-x-2 max-w-xs">
              {!isUser && (
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                  alt="avatar"
                />
              )}
              <div className={`chat-bubble ${isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-black"} px-4 py-2 rounded-lg shadow-md`}>
                <div className="text-xs font-semibold opacity-80">
                  {msg.firstName} {msg.lastName}
                </div>
                <div className="text-sm">{msg.text}</div>
                <div className="text-right text-xs opacity-50 mt-1">
                  12:45 • ✓✓
                </div>
              </div>
              {isUser && (
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                  alt="avatar"
                />
              )}
            </div>
          </div>
        );
      })}
       <div ref={messagesEndRef} />
    </div>

    {/* Input Area */}
    <div className="border-t border-gray-700 p-3 flex items-center space-x-2 bg-gray-800">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 px-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={sendMessage}
        className="btn btn-secondary px-4 py-2 rounded-full"
      >
        Send
      </button>
    </div>
  </div>
</div>

    
  )
}

export default Chat