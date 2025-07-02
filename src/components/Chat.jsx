import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';

const Chat = () => {

    const {targetUserId}=useParams();
    const [messages,setMessages]=useState([])
    const [newMessage,setNewMessage]=useState("")
    const user=useSelector(store=>store.user)
    const userId=user?._id
    useEffect(()=>{
        if(!userId){
            return;
        }
   const socket=createSocketConnection();

   socket.emit('joinChat',{userId,targetUserId})

    socket.on("messageReceiver",({firstName,text})=>{
        console.log(firstName+":"+text)
        setMessages([...messages,{firstName,text}])
    })

    return ()=>{
        socket.disconnect();
    }
    },[userId,targetUserId])


    const sendMessage=()=>{
         const socket=createSocketConnection();
        socket.emit("sendMessage",{firstName:user.firstName,targetUserId,userId,text:newMessage})
    }

  return (
    <div className='w-1/2 items-center border border-white justify-center m-auto'>
        <h1 className='border text-white font-bold p-5'>chat</h1>
        <div className='h-72'>
    <div className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
      />
    </div>
  </div>
  {messages.map((msg,index)=>{
    return(
        <>
         <div key={index} className="chat-header">
    {msg.firstName}
    <time className="text-xs opacity-50">12:45</time>
  </div>
  <div className="chat-bubble">{msg.text}</div>
  <div className="chat-footer opacity-50">seen</div>
  </>

    )
  })}
 
</div>
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