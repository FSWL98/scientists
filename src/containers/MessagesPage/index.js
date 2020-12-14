import React, { useState, useEffect } from 'react';
import { chats as ch } from "./consts";
import {SideBlock} from "../../components/SideBlock";
import {ButtonsGroup} from "../../components/ButtonsGroup";
import {MessagesComponent} from "../../components/MessagesComponent";
import { wsURL } from "../../services/baseURL";
import AuthService from "../../services/AuthService";


export const MessagesPage = props => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(undefined);

  useEffect(() => {
    setChats(ch);
  }, []);

  const handleChatSelect = id => {
    setActiveChat(chats.find(el => el.chat_id === id));
  }

  const sendMessage = msg => {
    socket.send(JSON.stringify({
      command: 'send',
      room: 1,
      message: msg,
    }));
  }

  useEffect(() => {
    setSocket(new WebSocket(`${wsURL}/chat/1/`));
    socket.onopen = () => {
      socket.send(JSON.stringify({
        command: 'setuser',
        user_id: AuthService.getUserLocal().id
      }));
      socket.send(JSON.stringify({
        command: 'join',
        room: 1
      }));
      console.log('new connection is opened');
    }
    socket.onmessage = e => {
      setMessages([...messages, e.data]);
    }
    return () => {
      socket.close(1000, 'opening new chat');
    }
  }, [activeChat])

  return (
    <div className="main-page">
      <SideBlock page='cabinet' match={props.match} />
      <div className="main-page_right">
        <ButtonsGroup />
        <MessagesComponent
          chats={chats}
          setActiveChat={handleChatSelect}
          activeChat={activeChat}
          messages={messages}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}