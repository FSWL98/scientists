import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

export const NavigationLinks = props => {
  const { path } = props.match;
  return (
    <div className="navigation-links">
      <Link to="/profile" className={path === '/profile/:id' ? 'active' : ''}>Личный кабинет</Link>
      <Link to="/main" className={path === '/main' ? 'active' : ''}>Вернуться на главную</Link>
      <Link to="/messages" className={path === '/messages' || path === '/messages/:chatId' ? 'active' : ''}>Сообщения</Link>
      <Link to="/profile/edit" className={path === '/profile/edit' ? 'active' : ''}>Редактировать профиль</Link>
    </div>
  )
};