import React, { useState, useEffect } from 'react';
import './index.scss';
import { Link } from "react-router-dom";
import scientistsService from "../../services/scientistsService";

export const NewsBlock = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  // хук жизненного цикла, срабатывающий при маунте компонента
  useEffect(() => {
    setLoading(true);
    scientistsService.getNews(0, 3).then(response => {
      console.log(response);
      setNews(response);
    });
  }, []);
  return (
    <div className="news-block">
      <h4>Новости науки</h4>
      <div className="news-block_container">
        {news.map((el, index) => {
          if (index < 3) {
            return (
              <Link className="news-block_element" key={el.id} to={`/news/${el.id}`}>
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