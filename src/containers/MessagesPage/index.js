import React, { useState, useEffect } from 'react';
import { chats as ch } from "./consts";
import {SideBlock} from "../../components/SideBlock";
import {ButtonsGroup} from "../../components/ButtonsGroup";
import {MessagesComponent} from "../../components/MessagesComponent";
import useWebSocket from 'react-use-websocket';
import { wsURL } from "../../services/baseURL";


export const MessagesPage = props => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const { sendMessage, lastMessage } = useWebSocket(`${wsURL}/chat/1/`, {
    onOpen: () => console.log('connection opened'),
    onError: () => console.log('error connecting to ws'),
  });

  useEffect(() => {
    setChats(ch);
  }, []);

  const handleChatSelect = id => {
    setActiveChat(chats.find(el => el.chat_id === id));
  }

  return (
    <div className="main-page">
      <SideBlock page='cabinet' match={props.match} />
      <div className="main-page_right">
        <ButtonsGroup />
        <MessagesComponent chats={chats} setActiveChat={handleChatSelect} activeChat={activeChat}/>
      </div>
    </div>
  );
}