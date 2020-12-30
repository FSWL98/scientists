import React, { useState, useEffect } from 'react';
import { ChatsList } from "./ChatsList";
import { ActiveChat } from "./ActiveChat";
import './index.scss';
import AuthService from "../../services/AuthService";

export const MessagesComponent = props => {
  const [isLogged, setLogged] = useState(false);

  // хук жизненного цикла, срабатывающий при маунте компонента
  useEffect(() => {
    setLogged(!!AuthService.getAuthToken());
  }, []);

  if (!isLogged)
    return (
      <section className="messages">
        <p className="unauthorized-text">Вы не авторизованы. Пожалуйста, войдите в систему, используя кнопку в верхнем меню навигации.</p>
      </section>
    );

  return (
    <section className="messages">
      <ChatsList
        chats={props.chats}
        setActiveChat={props.setActiveChat}
      />
      <ActiveChat
        activeChat={props.activeChat}
        messages={props.messages}
        sendMessage={props.sendMessage}
        messagesLoading={props.messagesLoading}
      />
    </section>
  );
};