import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import './index.scss'
import news from "../../assets/news.png";
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
import scientistsService from "../../services/scientistsService";

export const ButtonsGroup = () => {
  const [isLogged, setLogged] = useState(false);
  const [modal, setModal] = useState({
    show: false,
    username: '',
    password: '',
    error: false,
    step: 'login'
  });
  const [howToModal, setHowToModal] = useState(false);
  const history = useHistory();

  // хук жизненного цикла, срабатывающий при маунте компонента
  useEffect(() => {
    setLogged(!!AuthService.getAuthToken());
  }, []);

  // обработка отправки формы входа в систему
  const handleFormSubmit = event => {
    event.preventDefault();
    if (modal.step === 'login') {
      AuthService.login(modal.password, modal.username)
        .then(response => {
          history.go('/cabinet');
        })
        .catch(err => {
          setModal({...modal, password: '', error: true })
        });
    }
    else if (modal.step === 'reset') {
      scientistsService.resetPassword(modal.username)
        .then(response => {
          console.log(response);
          setModal({
            username: '',
            password: '',
            step: 'info',
            show: true,
            error: false
          })
        })
    }
  };

  const user = AuthService.getUserLocal();
  return (
    <div className="buttons-group">
      {/* Всплывающее окно входа в систему */}
      <Dialog open={modal.show} onClose={() => setModal({ show: false })} className="login-dialog">
        <button onClick={() => setModal({ show: false })} className="close">
          <img src={close} alt="Закрыть" />
        </button>
        <img src={logo} alt="picture" className="picture"/>
        {modal.step !== 'info' && (
          <form onSubmit={ev => handleFormSubmit(ev)}>
            <TextField
              value={modal.username}
              label="E-mail"
              variant="outlined"
              onChange={ev=> setModal({...modal, username: ev.target.value, error: false })}
              type="email"
              required
            />
            {modal.step === 'login' && (
              <>
                <TextField
                  value={modal.password}
                  label="Пароль"
                  variant="outlined"
                  onChange={ev => setModal({...modal, password: ev.target.value, error: false })}
                  type="password"
                  required
                />
              </>
            )}
            <Button
              type="submit"
              variant="contained"
              className="primary"
              disabled={modal.username === '' || modal.password === '' || modal.error}
            >
              {modal.step === 'login' ? 'Войти в систему' : 'Сбросить пароль'}
            </Button>
            <button
              className="forgot-password"
              onClick={() => {
                setModal({
                  show: true,
                  username: '',
                  password: '.',
                  error: false,
                  step: 'reset'
                })
              }}
            >
              Забыли пароль?
            </button>
          </form>
        )}
        {modal.step === 'info' && (
          <div className="reset_confirm">
            <p>
              Если почта введена верно, то на нее отправлено письмо со ссылкой на сброс пароля. Для завершения сброса пароля, пожалуйста, пройдите по ссылке.
            </p>
            <Button
              className="primary"
              variant="contained"
              onClick={() => setModal({
                show: false
              })}
            >
              Понятно
            </Button>
          </div>
        )}
        {modal.error && (
          <p className="error-text">
            Произошла ошибка при входе. Возможно, Вы ввели неверные данные или сервер сейчас недоступен. Пожалуйста, попробуйте снова или обратитесь в службу поддержки.
          </p>
        )}
        {modal.step === 'login' && (
          <p className="help-text">
            Для получения логина и пароля Вам необходимо отправить резюме на почту example@mail.ru
          </p>
        )}
      </Dialog>
      {/* Всплывающее окно "как это работае" */}
      <Dialog open={howToModal} onClose={() => setHowToModal(false)}>
        <div className="how-to-modal">
          <h4>Как это работает?</h4>
          <ul>
            <li>Определите параметры поиска в панели на левой стороне</li>
            <li>Нажмите кнопку поиск</li>
            <li>После прохождения авторизации вы можете изучить полный профиль любого исследователя</li>
          </ul>
          <p>
            Выбор исследователей, представленных на сайте является субъективным и отражает мнение редакторов портала.
            Для регистрации на портале, Вам необходимо отправить резюме на почту example@mail.ru
          </p>
          <Button className="primary" onClick={() => setHowToModal(false)}>Понятно</Button>
        </div>
      </Dialog>
      <Button className="default" onClick={() => setHowToModal(true)}><img src={how}/>Как это работает?</Button>
      <Link className="default" to="/news"><img src={news}/><span>Новости</span></Link>
      {!isLogged && (
        <Button className="primary" onClick={() => setModal({ show: true, username: '', password: '', step: 'login', error: false })}>Войти в систему</Button>
      )}
      {isLogged && (
        <div className="logged-button">
          <Link className="main" to="/profile">
            <span className="image-container"><img src={AuthService.getUserLocal().image} alt="" /></span>
            <span>{user.name.split(' ')[0]} {user.name.split(' ')[1][0]}. {`${user.name.split(' ')[2] ? user.name.split(' ')[2][0] + '.' : ''}`}</span>
          </Link>
          <div className="hovered">
            <Link className="line" to="/profile/edit">
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

