import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { chats as ch } from "./consts";
import {SideBlock} from "../../components/SideBlock";
import {ButtonsGroup} from "../../components/ButtonsGroup";
import {MessagesComponent} from "../../components/MessagesComponent";
import { wsURL } from "../../services/baseURL";
import AuthService from "../../services/AuthService";
import scientistsService from "../../services/scientistsService";


export const MessagesPage = props => {
  const [socket, setSocket] = useState(undefined);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef(messages);
  const history = useHistory();

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    const chatsSocket = new WebSocket(`${wsURL}/roomlist/`);
    chatsSocket.onopen = () => {
      console.log('chats list connection opened');
      chatsSocket.send(JSON.stringify({
        command: 'setuser',
        user_id: AuthService.getUserLocal().id,
      }));
      chatsSocket.send(JSON.stringify({
        command: 'get_list'
      }))
    };
    chatsSocket.onmessage = e => {
      const data = JSON.parse(e.data);
      console.log(data);
      if (data.command === 'get_list') {
        setChats(data.roomlist);
        if (props.match.params.chatId) {
          setActiveChat(data.roomlist.find(el => parseInt(el.room_id, 10) === parseInt(props.match.params.chatId, 10)));
        }
      }
    };
  }, []);

  const handleChatSelect = id => {
    history.push(`/messages/${id}`);
    setActiveChat(chats.find(el => parseInt(el.room_id, 10) === parseInt(id, 10)));
  };

  const sendMessage = msg => {
    socket.send(JSON.stringify({
      command: 'send',
      room: activeChat.room_id,
      message: msg,
    }));
  };

  useEffect(() => {
    if (activeChat) {
      setMessages([]);
      setSocket(new WebSocket(`${wsURL}/chat/${activeChat.room_id}/`));
    }
    return () => {
      if (socket)
        socket.close(1000, 'opening new chat');
    }
  }, [activeChat])

  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        socket.send(JSON.stringify({
          command: 'setuser',
          user_id: AuthService.getUserLocal().id
        }));
        socket.send(JSON.stringify({
          command: 'join',
          room: activeChat.room_id
        }));
        socket.send(JSON.stringify({
          command: 'get_room_chat_messages',
          room: activeChat.room_id,
          pagenumber: 1
        }))
        console.log('new connection is opened');
      }
      socket.onmessage = e => {
        const data = JSON.parse(e.data);
        console.log(data);
        if (data.command === 'send') {
          console.log(messagesRef.current);
          const array = messagesRef.current;
          console.log(array);
          setMessages([...array, data])
        }
        else if (data.command === 'get_room_chat_messages')
          setMessages(data.messages);
      }
    }
  }, [socket])

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