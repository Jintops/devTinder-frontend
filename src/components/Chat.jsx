import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchChatMessages = async () => {
  const chat = await axios.get(`${BASE_URL}/api/chat/${targetUserId}`, {
      withCredentials: true,
    });
    const chatMessages = chat?.data?.messages?.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId.firstName,
        location: senderId.location,
        text,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();

    socket.emit("joinChat", { userId, targetUserId });

    socket.on("messageReceiver", ({ firstName, location, text }) => {
      setMessages((messages) => [...messages, { firstName, location, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      location: user.location,
      targetUserId,
      userId,
      text: newMessage,
    });
    setNewMessage("");
  };

    const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1); // goes back to previous page
  };
const location = useLocation();
  const { photoUrl, firstName, location: userLocation } = location.state || {};

  return (
    <div className="flex flex-col items-center  my-10 lg:mt-20 px-4">
      <div className="w-full max-w-2xl flex flex-col h-full border border-gray-700 rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gray-800/80 backdrop-blur-md p-4 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center gap-3">
            <img
              src={photoUrl}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="text-white font-semibold text-lg">{firstName}</h2>
              <p className="text-xs text-green-400">Online</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-red-400 transition" onClick={handleClose}>
            ✕
          </button>
        </div>

        {/* Chat Messages */}
        <div className=" overflow-y-auto space-y-3 bg-gray-800/50 h-[450px] lg:h-[550px] px-4 py-3 ">
          {messages.map((msg, index) => {
            const isUser = user.firstName === msg.firstName;
            return (
              <div
                key={index}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs md:max-w-sm px-4 py-3 rounded-2xl shadow-md ${
                    isUser
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-700 text-gray-100 rounded-bl-none"
                  }`}
                >
                  <p className="text-xs text-gray-300 opacity-80 font-semibold mb-1">
                    {msg.firstName}
                  </p>
                  <p className="text-md">{msg.text}</p>
                  <p className="text-[10px] opacity-60 text-right mt-1">
                    12:45 • ✓✓
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-700 bg-gray-800/90 p-4 flex items-center gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
