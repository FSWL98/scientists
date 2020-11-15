import { Link } from 'react-router-dom';
import React from "react";
import './index.scss'
import news from "../../assets/news.png";
import forums from "../../assets/forums.png";
import how from "../../assets/how.png"
import Button from "@material-ui/core/Button";
export const ButtonsGroup = () => (
  <div className="buttons-group">
    <Button className="default"><img src={how}/>Как это работает?</Button>
    <Link className="default" to="/scientists/news"><img src={news}/>Новости</Link>
    <Link className="default" to="/scientists/forum"> <img src={forums}/>Форумы</Link>
    <Link className="primary" to="/scientists/cabinet">Войти в систему</Link>
  </div>
);

