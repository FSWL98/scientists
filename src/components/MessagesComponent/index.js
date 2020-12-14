import React from 'react';
import { ChatsList } from "./ChatsList";
import { ActiveChat } from "./ActiveChat";
import './index.scss';

export const MessagesComponent = props => (
  <section className="messages">
    <ChatsList chats={props.chats} setActiveChat={props.setActiveChat}/>
    <ActiveChat activeChat={props.activeChat} />
  </section>
)