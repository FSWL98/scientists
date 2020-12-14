import React from 'react';
import './index.scss';
import { ChatElement } from "../ChatElement";

export const ChatsList = props => {
  const handleChatClick = id => {
    props.setActiveChat(id);
  }

  return <section className="chats-list">
    {props.chats.map(el => <ChatElement chat={el} key={el.chat_id} handleChatClick={handleChatClick}/>)}
  </section>
}