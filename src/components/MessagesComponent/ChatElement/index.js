import React from 'react';
import logo from '../../../assets/logo512.png';
import './index.scss';

export const ChatElement = props => (
  <div className={`chat-element unread`} onClick={() => props.handleChatClick(props.chat.room_id)}>
    <img src={props.chat.friend_photo || logo} alt='avatar' />
    <div className="chat-element_info">
      <span className="name">
        {props.chat.friend_name} {props.chat.friend_surname}
      </span>
      <p className="message">
        Нажмите чтобы открыть диалог
      </p>
    </div>
  </div>
)