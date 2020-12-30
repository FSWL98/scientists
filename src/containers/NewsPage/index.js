import React, { useState, useEffect } from 'react';
import './index.scss';
import scientistsService from "../../services/scientistsService";
import Pagination from '@material-ui/lab/Pagination';
import logo from "../../assets/Logo.svg";
import {ButtonsGroup} from "../../components/ButtonsGroup";
import {Link} from "react-router-dom";

export const NewsPage = props => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(-1);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  // хук жизненного цикла, срабатывающий при изменении состояния page
  useEffect(() => {
    setLoading(true);
    const newsRequest = scientistsService.getNews(page - 1, 9);
    const countRequest = scientistsService.getNewsCount();
    Promise.all([newsRequest, countRequest])
      .then(([newsResponse, countResponse]) => {
        setNews(newsResponse);
        setCount(countResponse.count);
        setLoading(false);
      })
  }, [page]);

  return (
    <div className="news-page">
      <header>
        <Link to='/main'><img src={logo} alt="logo" /></Link>
        <ButtonsGroup />
      </header>
      <section className="news-page_content">
        <Pagination
          color="primary"
          count={Math.ceil(count / 9)}
          page={page}
          onChange={(ev, value) => setPage(value)}
          size={document.body.clientWidth > 1600 ? 'large' : 'medium'}
        />
        {loading && (
          <p>Загрузка новостей...</p>
        )}
        {!loading && (
          <div className="news-page_content__news">
            {/* перебор всех новостей */}
            {news.map(el => (
              <Link className="element" key={el.id} to={`/news/${el.id}`}>
                <span className="news-date">{el.date}</span>
                <span className="news-title">{el.headLine}</span>
              </Link>
            ))}
          </div>
        )}
        {count === 0 && (
          <p>К сожалению, с момента нашего открытия в мире науки не произошло ничего интересно :(</p>
        )}
        <Pagination
          color="primary"
          count={Math.ceil(count / 9)}
          page={page}
          onChange={(ev, value) => setPage(value)}
          size={document.body.clientWidth > 1600 ? 'large' : 'medium'}
        />
        <Link to="/main" className="to-main-link">На главную</Link>
      </section>
    </div>
  )

}