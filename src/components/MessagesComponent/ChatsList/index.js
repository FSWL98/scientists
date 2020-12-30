import React from 'react';
import './index.scss';
import { ChatElement } from "../ChatElement";

export const ChatsList = props => {
  const handleChatClick = id => {
    props.setActiveChat(id);
  };

  return <section className="chats-list">
    {props.chats.map(el => <ChatElement chat={el} key={el.room_id} handleChatClick={handleChatClick}/>)}
    {props.chats.length === 0 && (
      <p>У Вас пока нет активных диалогов</p>
    )}
  </section>
};