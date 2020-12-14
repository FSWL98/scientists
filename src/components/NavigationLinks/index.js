import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

export const NavigationLinks = props => {
  const { path } = props.match;
  return (
    <div className="navigation-links">
      <Link to="/scientists/profile" className={path === '/scientists/profile/:id' ? 'active' : ''}>Личный кабинет</Link>
      <Link to="/scientists/main" className={path === '/scientists/main' ? 'active' : ''}>Вернуться на главную</Link>
      <Link to="/scientists/messages" className={path === '/scientists/messages' ? 'active' : ''}>Сообщения</Link>
      <Link to="/scientists/profile/edit" className={path === '/scientists/profile/edit' ? 'active' : ''}>Редактировать профиль</Link>
    </div>
  )
};