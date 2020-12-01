import React, { useState, useEffect } from 'react';
import './index.scss';
import { Link } from "react-router-dom";
import scientistsService from "../../services/scientistsService";

export const NewsBlock = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    scientistsService.getNews(0, 3).then(response => setNews(response));
  }, []);
  return (
    <div className="news-block">
      <h4>Новости науки</h4>
      <div className="news-block_container">
        {news.map((el, index) => {
          if (index < 6) {
            return (
              <Link className="news-block_element" key={el.id} to={`/scientists/news/${el.id}`}>
                <span className="news-date">{el.date}</span>
                <span className="news-title">{el.headLine}</span>
              </Link>
            )
          }
          return null;
        })}
      </div>
    </div>
  );
};