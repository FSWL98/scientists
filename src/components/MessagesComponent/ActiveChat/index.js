import React, { useState, useEffect } from 'react';
import logo from '../../../assets/logo512.png';
import './index.scss';
import AuthService from "../../../services/AuthService";
import TextField from "@material-ui/core/TextField";
import {Link} from "react-router-dom";
import { getTime } from '../ChatElement/index';

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
            <Link className="name" to={`/profile/${props.activeChat.friend_id}`}>{props.activeChat.friend_name} {props.activeChat.friend_surname}</Link>
          </div>
          <div className="messages">
            {props.messages.map((msg, index) => (
              <div
                className={`messages_item ${parseInt(msg.user_id, 10) === AuthService.getUserLocal().id ? 'sent' : 'received'}`}
                id={index === 0 ? 'last-message' : ''}
              >
                <span className="author">{msg.username}</span>
                <span className="text">{msg.message}</span>
                <span className="time">{getTime(msg.natural_timestamp)}</span>
              </div>
            ))}
          </div>
          <form className="send-message" onSubmit={ev => {
            ev.preventDefault();
            props.sendMessage(inputText);
            setText('');
          }}>
            <TextField value={inputText} onChange={ev => setText(ev.target.value)} variant="outlined" multiline rowsMax={6}/>
            <button
              className="send"
              type="submit"
              disabled={!inputText}
            />
          </form>
        </>
      )}
    </section>
  );
};