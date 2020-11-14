import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

export const NavigationLinks = props => {
  const { path } = props.match;
  return (
    <div className="navigation-links">
      <Link to="/cabinet" className={path === '/cabinet' ? 'active' : ''}>Личный кабинет</Link>
      <Link to="/" className={path === '/' ? 'active' : ''}>Вернуться на главную</Link>
      <Link to="/messages" className={path === '/messages' ? 'active' : ''}>Сообщения</Link>
      <Link to="/cabinet/edit" className={path === '/cabinet/edit' ? 'active' : ''}>Редактировать профиль</Link>
    </div>
  )
};