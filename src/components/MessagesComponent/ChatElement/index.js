import React from 'react';
import logo from '../../../assets/logo512.png';
import './index.scss';

export const ChatElement = props => (
  <div className={`chat-element ${props.chat.status ? 'read' : 'unread'}`} onClick={() => props.handleChatClick(props.chat.chat_id)}>
    <img src={props.chat.user.image || logo} alt='avatar' />
    <div className="chat-element_info">
      <span className="name">
        {props.chat.user.name} {props.chat.user.surname}
      </span>
      <p className="message">
        {props.chat.lastMessage.author ? 'Вы: ' : ''}{props.chat.lastMessage.text}
      </p>
    </div>
  </div>
)