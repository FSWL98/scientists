import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import './index.scss'
import news from "../../assets/news.png";
import forums from "../../assets/forums.png";
import how from "../../assets/how.png"
import Button from "@material-ui/core/Button";
import AuthService from "../../services/AuthService";
import job from '../../assets/job.svg';
export const ButtonsGroup = () => {
  const [isLogged, setLogged] = useState(false);
  const [modal, setModal] = useState({
    show: false,
    username: '',
    password: '',
  });
  useEffect(() => {
    setLogged(!!AuthService.getAuthToken());
  }, []);
  return (
    <div className="buttons-group">
      <Button className="default"><img src={how}/>Как это работает?</Button>
      <Link className="default" to="/scientists/news"><img src={news}/>Новости</Link>
      <Link className="default" to="/scientists/forum"> <img src={forums}/>Форумы</Link>
      {!isLogged && (
        <Button className="primary" onClick={() => setModal({ show: true, username: '', password: '' })}>Войти в систему</Button>
      )}
      {isLogged && (
        <div className="logged-button">
          <div className="main">
            <img src={job} alt="job" />
            <span>Фамилия И.О.</span>
          </div>
          <div className="hovered">
            <div className="line">
              <img src={job} alt="job" />
              <span>Настройки</span>
            </div>
            <div className="line">
              <img src={job} alt="job" />
              <span>Выйти</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

