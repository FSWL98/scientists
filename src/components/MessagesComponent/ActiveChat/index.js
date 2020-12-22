import React, { useState, useEffect } from 'react';
import logo from '../../../assets/logo512.png';
import './index.scss';
import AuthService from "../../../services/AuthService";
import TextField from "@material-ui/core/TextField";

export const ActiveChat = props => {
  const [inputText, setText] = useState('');

  useEffect(() => {
    const lastMessage = document.getElementById('last-message');
    if (lastMessage)
      lastMessage.scrollIntoView();
  }, []);
  return (
    <section className="active-chat">
      {!props.activeChat && (
        <p className="choose-chat">
          Выберите чат чтобы начать диалог
        </p>
      )}
      {!!props.activeChat && (
        <>
          <div className="person">
            <img src={props.activeChat.friend_photo || logo} alt="avatar" />
            <span className="name">{props.activeChat.friend_name} {props.activeChat.friend_surname}</span>
          </div>
          <div className="messages">
            {props.messages.map((msg, index) => (
              <div
                className={`messages_item ${parseInt(msg.user_id, 10) === AuthService.getUserLocal().id ? 'sent' : 'received'}`}
                id={index === 0 ? 'last-message' : ''}
              >
                <span className="author">{msg.username}</span>
                <span className="text">{msg.message}</span>
                <span className="time">Вчера, 19:40</span>
              </div>
            ))}
          </div>
          <div className="send-message">
            <TextField value={inputText} onChange={ev => setText(ev.target.value)} variant="outlined" multiline rowsMax={6}/>
            <button
              className="send"
              type="button"
              onClick={() => {
                props.sendMessage(inputText);
                setText('');
              }}
              disabled={!inputText}
            />
          </div>
        </>
      )}
    </section>
  );
};