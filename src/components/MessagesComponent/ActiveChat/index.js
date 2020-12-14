import React, { useState } from 'react';
import logo from '../../../assets/logo512.png';
import './index.scss';
import AuthService from "../../../services/AuthService";
import TextField from "@material-ui/core/TextField";

export const ActiveChat = props => {
  const [inputText, setText] = useState('');
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
            <img src={props.activeChat.user.image || logo} alt="avatar" />
            <span className="name">{props.activeChat.user.name} {props.activeChat.user.surname}</span>
          </div>
          <div className="messages">
            {props.messages.map(msg => (
              <div className={`messages_item ${msg.user_id === AuthService.getUserLocal().id ? 'sent' : 'received'}`}>
                <span className="author">{msg.username}</span>
                <span className="text">{msg.message}</span>
                <span className="time">Вчера, 19:40</span>
              </div>
            ))}
          </div>
          <div className="send-message">
            <TextField value={inputText} onChange={ev => setText(ev.target.value)} variant="outlined" />
            <button className="send" type="button" onClick={() => {
              props.sendMessage(inputText);
              setText('');
            }}/>
          </div>
        </>
      )}
    </section>
  );
};