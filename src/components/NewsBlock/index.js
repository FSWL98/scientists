import React from 'react';
import './index.scss';
import { news } from './consts';
import { Link } from "react-router-dom";

export const NewsBlock = () => (
  <div className="news-block">
    <h4>Новости науки</h4>
    <div className="news-block_container">
      {news.map((el, index) => {
        if (index < 6) {
          return (
            <Link className="news-block_element" key={el.id} to={`/news/${el.id}`}>
              <span className="news-date">{el.date}</span>
              <span className="news-title">{el.title}</span>
            </Link>
          )
        }
        return null;
      })}
    </div>
  </div>
);