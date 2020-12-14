import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import './index.scss'
import news from "../../assets/news.png";
import forums from "../../assets/forums.png";
import how from "../../assets/how.png"
import Button from "@material-ui/core/Button";
import AuthService from "../../services/AuthService";
import logo from '../../assets/pablita-finance 1.png';
import close from '../../assets/Close.svg';
import settings from '../../assets/settings.svg';
import logout from '../../assets/logout.svg';
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import { useHistory } from 'react-router-dom';

export const ButtonsGroup = () => {
  const [isLogged, setLogged] = useState(false);
  const [modal, setModal] = useState({
    show: false,
    username: '',
    password: '',
    error: false,
  });
  const history = useHistory();

  useEffect(() => {
    setLogged(!!AuthService.getAuthToken());
  }, []);

  const handleFormSubmit = event => {
    event.preventDefault();
    AuthService.login(modal.password, modal.username)
      .then(response => {
        history.go('/scientists/cabinet');
      })
      .catch(err => {
        setModal({...modal, password: '', error: true })
      });
  }

  const user = AuthService.getUserLocal();
  return (
    <div className="buttons-group">
      <Dialog open={modal.show} onClose={() => setModal({ show: false, username: '', password: '', error: false })} className="login-dialog">
        <button onClick={() => setModal({ show: false, username: '', password: '', error: false })} className="close">
          <img src={close} alt="Закрыть" />
        </button>
        <img src={logo} alt="picture" className="picture"/>
        <form onSubmit={ev => handleFormSubmit(ev)}>
          <TextField
            value={modal.username}
            label="E-mail"
            variant="outlined"
            onChange={ev=> setModal({...modal, username: ev.target.value, error: false })}
            type="email"
            required
          />
          <TextField
            value={modal.password}
            label="Пароль"
            variant="outlined"
            onChange={ev => setModal({...modal, password: ev.target.value, error: false })}
            type="password"
            required
          />
          <Button
            type="submit"
            variant="contained"
            className="primary"
            disabled={modal.username === '' || modal.password === '' || modal.error}
          >
            Войти в систему
          </Button>
        </form>
        {modal.error && (
          <p className="error-text">
            Произошла ошибка при входе. Возможно, Вы ввели неверные данные или сервер сейчас недоступен. Пожалуйста, попробуйте снова или обратитесь в службу поддержки.
          </p>
        )}
        <p className="help-text">
          Для получения логина и пароля Вам необходимо отправить резюме на почту example@mail.ru
        </p>
      </Dialog>
      <Button className="default"><img src={how}/>Как это работает?</Button>
      <Link className="default" to="/scientists/news"><img src={news}/><span>Новости</span></Link>
      {!isLogged && (
        <Button className="primary" onClick={() => setModal({ show: true, username: '', password: '' })}>Войти в систему</Button>
      )}
      {isLogged && (
        <div className="logged-button">
          <Link className="main" to="/scientists/profile">
            <span className="image-container"><img src={AuthService.getUserLocal().image} alt="" /></span>
            <span>{user.name.split(' ')[0]} {user.name.split(' ')[1][0]}. {`${user.name.split(' ')[2] ? user.name.split(' ')[2][0] + '.' : ''}`}</span>
          </Link>
          <div className="hovered">
            <Link className="line" to="/scientists/profile/edit">
              <span className="image-container"><img src={settings} alt="" /></span>
              <span>Настройки</span>
            </Link>
            <button className="line" onClick={() => AuthService.logout()}>
              <span className="image-container"><img src={logout} alt="" /></span>
              <span>Выйти</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

