import Button from "@material-ui/core/Button";
import React from "react";
import './index.scss'
import news from "../../assets/news.png";
import forums from "../../assets/forums.png";
import how from "../../assets/how.png"
export const ButtonsGroup = () => (
  <div className="buttons-group">
    <Button variant="contained" className="default"><img src={how}/>Как это работает?</Button>
    <Button variant="contained" className="default"><img src={news}/>Новости</Button>
    <Button variant="contained" className="default"> <img src={forums}/>Форумы</Button>
    <Button variant="contained" className="primary">Войти в систему</Button>
  </div>
);

