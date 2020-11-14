import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

export const NavigationLinks = props => {
  const { path } = props.match;
  return (
    <div className="navigation-links">
      <Link to="/scientists/cabinet" className={path === '/scientists/cabinet' ? 'active' : ''}>Личный кабинет</Link>
      <Link to="/scientists" className={path === '/scientists' ? 'active' : ''}>Вернуться на главную</Link>
      <Link to="/scientists/messages" className={path === '/scientists/messages' ? 'active' : ''}>Сообщения</Link>
      <Link to="/scientists/cabinet/edit" className={path === '/scientists/cabinet/edit' ? 'active' : ''}>Редактировать профиль</Link>
    </div>
  )
};