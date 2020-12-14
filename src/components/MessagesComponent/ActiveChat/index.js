import React from 'react';
import logo from '../../../assets/logo512.png';
import './index.scss';

export const ActiveChat = props => (
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
          <div className="messages_item sent">
            <span className="author">Семен</span>
            <span className="text">Приветик</span>
            <span className="time">Сегодня, 15:30</span>
          </div>
          <div className="messages_item received">
            <span className="author">Егор</span>
            <span className="text">Привет! :)</span>
            <span className="time">Сегодня, 15:33</span>
          </div>
        </div>
        <div className="send-message">
          <span>Тут текст сообщения должен быть</span>
          <button className="send" />
        </div>
      </>
    )}
  </section>
)