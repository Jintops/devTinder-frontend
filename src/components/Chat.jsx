import React, { useEffect, useState } from 'react'
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
    <div className='w-1/2 items-center border border-white justify-center m-auto'>
        <h1 className='border text-white font-bold p-5'>chat</h1>
        <div className='h-72 overflow-scroll'>
    
  
 {messages.map((msg, index) => {
  return (
    <div key={index} className="chat chat-start mb-2 mt-1">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User Avatar"
            src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
          />
        </div>
      </div>
      <div className="chat-bubble bg-blue-100 text-black">
        <div className="flex justify-between items-center mb-1 text-xs font-semibold text-gray-600">
          <span>{`${msg.firstName}  ${msg.lastName}`}</span>
          <span className="opacity-50">12:45</span>
        </div>
        <div className="text-sm mb-1">
          {msg.text}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>seen</span>
          <span>✓✓</span> 
        </div>
      </div>
    </div>
  );
})}


 

<div className="chat chat-end ">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
      />
    </div>
  </div>
  <div className="chat-header">
    Anakin
    <time className="text-xs opacity-50">12:46</time>
  </div>
  <div className="chat-bubble">I hate you!</div>
  <div className="chat-footer opacity-50">Seen at 12:46</div>
</div>
</div>
<div className='flex '>
    <input value={newMessage} className='border w-full p-3 m-1 text-white' onChange={(e)=>setNewMessage(e.target.value)}></input>
    <button onClick={sendMessage} className='btn btn-secondary m-1'>send</button>
</div>
    </div>
    
  )
}

export default Chat