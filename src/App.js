import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import {MainPage} from "./containers/MainPage";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {NewsItemPage} from "./containers/NewsItemPage";
import {CabinetPage} from "./containers/CabinetPage";
import AuthService from "./services/AuthService";
import {NewsPage} from "./containers/NewsPage";
import {MessagesPage} from "./containers/MessagesPage";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";

function App() {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    // проверка наличия токена в local storage
    if (AuthService.getAuthToken())
      AuthService.checkAuth().then(response => {
        if (response.status !== 200) {
          // удаление токена, если он оказался невалидным
          AuthService.logout();
          window.location.reload();
        }
      });
    else localStorage.removeItem('user');
    if (document.body.clientWidth < 1200) {
      setModal(true);
    }
  }, []);

  return (
    <>
      {/* Всплывающее окно на маленьких экранах, предупреждающее о возможных проблемах*/}
      <Dialog open={modal} onClose={() => setModal(false)}>
        <div className="not-working-modal">
          <h4>Внимание!</h4>
          <p>На данный момент сайт корректно отображается лишь на устройствах с шириной экрана от 1200px.
            На Вашем устройстве элементы сайта могут отображаться некорректно и быть недоступными. Приносим извинения
            за доставленные неудобства</p>
          <Button variant="contained" className="primary" onClick={() => setModal(false)}>Понял</Button>
        </div>
      </Dialog>
      {/* Роутер приложения */}
      <BrowserRouter>
        <Switch>
          <Route exact path="/main" component={MainPage} />
          <Route exact path="/profile" component={CabinetPage} />
          <Route exact path="/profile/edit" component={CabinetPage} />
          <Route exact path="/profile/:id" component={CabinetPage} />
          <Route exact path="/news" component={NewsPage} />
          <Route exact path="/news/:newsID" component={NewsItemPage} />
          <Route exact path="/messages" component={MessagesPage} />
          <Route exact path="/messages/:chatId" component={MessagesPage} />
          <Redirect from="/" to="/main"/>
          <Redirect from="/scientists" to="/main"/>
        </Switch>
      </BrowserRouter></>
  );
}

export default App;
