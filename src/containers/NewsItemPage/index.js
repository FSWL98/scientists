import React, { useState, useEffect } from 'react';
import './index.scss';
import logo from '../../assets/Logo.svg';
import { ButtonsGroup } from "../../components/ButtonsGroup";
import { Link } from "react-router-dom";
import {baseURL} from "../../services/baseURL";

export const NewsItemPage = props => {
  const [item, setItem] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const request = fetch(`${baseURL}/api/v1/news/${props.match.params.newsID}/`, {
      method: 'GET',
      mode: 'cors',
    }).then(response => {
      return response.json();
    }).then(resp => {
      setItem(resp);
      setLoading(false);
    })
  }, []);
  if (isLoading)
    return <div>Загрузка..</div>;
  return (
    <div className="news-item-page">
      <header>
        <img src={logo} alt="logo" />
        <ButtonsGroup />
      </header>
      <section className="news-item">
        <div className="image-container" style={{ background: `url("${item.image}") no-repeat`, backgroundSize: 'cover' }}>
          <div className="text">
            <span className="text_title">
              {item.headLine}
            </span>
            <span className="text_date">
              {item.date}
            </span>
          </div>
        </div>
        <div className="news-text">
          <p>{item.announce}</p>
        </div>
        <div className="links-container">
          <Link to="/main">Вернуться на главную</Link>
          <Link to="/news">Все новости</Link>
        </div>
      </section>
    </div>
  );
};