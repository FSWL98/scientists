import React from 'react';
import logo from '../../../assets/logo512.png';
import './index.scss';

// парсер месяца из числового формата в текстовый
const getMonth = month => {
  switch (month) {
    case '01':
      return ' января';
    case '02':
      return ' февраля';
    case '03':
      return ' марта';
    case '04':
      return ' апреля';
    case '05':
      return ' мая';
    case '06':
      return ' июня';
    case '07':
      return ' июля';
    case '08':
      return ' августа';
    case '09':
      return ' сентября';
    case '10':
      return ' октября';
    case '11':
      return ' ноября';
    case '12':
      return ' декабря';
    default:
      return '';
  }
};

// парсер даты из формата timestamp в читаемый формат
export const getTime = time => {
  let result = '';
  const date = new Date();
  // получение разницы в часах между UTC и часовым поясом пользователя
  const offset = Math.ceil(date.getTimezoneOffset() / -60);
  if (time) {
    const arr = time.split('.')[0].split(' ');
    const [year, month, day] = arr[0].split('-');
    const [hour, minutes, seconds] = arr[1].split(':');
    result += `${(day + getMonth(month))} в ${parseInt(hour) + offset}:${minutes}`;
  }
  return result;
};

export const ChatElement = props => (
  <div className={`chat-element unread`} onClick={() => props.handleChatClick(props.chat.room_id)}>
    <img src={props.chat.friend_photo || logo} alt='avatar' />
    <div className="chat-element_info">
      <span className="name">
        {props.chat.friend_name} {props.chat.friend_surname}
      </span>
      <p className="message">
        {props.chat.last_message}
      </p>
      <span className="time">
        {getTime(props.chat.timestamp)}
      </span>
    </div>
  </div>
);