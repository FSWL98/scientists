import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { chats as ch } from "./consts";
import {SideBlock} from "../../components/SideBlock";
import {ButtonsGroup} from "../../components/ButtonsGroup";
import {MessagesComponent} from "../../components/MessagesComponent";
import { wsURL } from "../../services/baseURL";
import AuthService from "../../services/AuthService";
import scientistsService from "../../services/scientistsService";
import aud from '../../assets/audio/u_edomlenie-9.mp3';


export const MessagesPage = props => {
  const [socket, setSocket] = useState(undefined);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef(messages);
  const history = useHistory();

  // хук жизненного цикла, срабатывающий при изменении состояния messages
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // хук жизненного цикла, срабатывающий при маунте компонента
  useEffect(() => {
    // объявление сокета списка комнат
    const chatsSocket = new WebSocket(`${wsURL}/roomlist/`);
    chatsSocket.onopen = () => {
      console.log('chats list connection opened');
      // установка id подключившегося к сокету пользователя
      chatsSocket.send(JSON.stringify({
        command: 'setuser',
        user_id: AuthService.getUserLocal().id,
      }));
      // запрос на получение списка комнат
      chatsSocket.send(JSON.stringify({
        command: 'get_list'
      }))
    };
    // обновление состояния при получении сообщения от сокета
    chatsSocket.onmessage = e => {
      const data = JSON.parse(e.data);
      // изменение только в случае получения конкретной команды
      if (data.command === 'get_list') {
        setChats(data.roomlist);
        if (props.match.params.chatId) {
          setActiveChat(data.roomlist.find(el => parseInt(el.room_id, 10) === parseInt(props.match.params.chatId, 10)));
        }
      }
    };
  }, []);

  // обработчик клика по чату
  const handleChatSelect = id => {
    history.push(`/messages/${id}`);
    setActiveChat(chats.find(el => parseInt(el.room_id, 10) === parseInt(id, 10)));
  };

  // функция отправки сообщения в чат
  const sendMessage = msg => {
    socket.send(JSON.stringify({
      command: 'send',
      room: activeChat.room_id,
      message: msg,
    }));
  };

  // хук жизненного цикла, срабатывающий при изменении параметра chatId в query адресной строки
  useEffect(() => {
    setMessages([]);
    setSocket(new WebSocket(`${wsURL}/chat/${props.match.params.chatId}/`));
    return () => {
      if (socket) {
        console.log(socket);
        setMessagesLoading(true);
        socket.send(JSON.stringify({
          command: 'leave'
        }));
        socket.close(1000, 'opening new chat');
      }
    }
  }, [props.match.params.chatId]);

  // хук жизненого цикла, срабатывающий при изменении состояния socket (после предыдущего хука)
  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        setMessagesLoading(true);
        socket.send(JSON.stringify({
          command: 'setuser',
          user_id: AuthService.getUserLocal().id
        }));
        socket.send(JSON.stringify({
          command: 'join',
          room: props.match.params.chatId
        }));
        socket.send(JSON.stringify({
          command: 'get_room_chat_messages',
          room: props.match.params.chatId,
          pagenumber: 1
        }));
      };
      socket.onmessage = e => {
        const data = JSON.parse(e.data);
        if (data.command === 'send') {
          const audio = new Audio();
          audio.src = aud;
          if (data.user_id !== AuthService.getUserLocal().id)
            audio.autoplay = true;
          const array = messagesRef.current;
          setMessages([data, ...array])
        }
        else if (data.command === 'get_room_chat_messages') {
          setMessages(data.messages);
          setMessagesLoading(false);
        }
      }
    }
  }, [socket]);

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
          messagesLoading={messagesLoading}
        />
      </div>
    </div>
  );
};