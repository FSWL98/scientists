import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import {MainPage} from "./containers/MainPage";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {NewsItemPage} from "./containers/NewsItemPage";
import {CabinetPage} from "./containers/CabinetPage";
import AuthService from "./services/AuthService";
import {NewsPage} from "./containers/NewsPage";
import {MessagesPage} from "./containers/MessagesPage";

function App() {
  useEffect(() => {
    console.log(process.env);
    if (AuthService.getAuthToken())
      AuthService.checkAuth().then(response => {
        if (response.status !== 200) {
          AuthService.logout();
          window.location.reload();
        }
      })
    else localStorage.removeItem('user')
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/main" component={MainPage} />
        <Route exact path="/profile" component={CabinetPage} />
        <Route exact path="/profile/edit" component={CabinetPage} />
        <Route exact path="/profile/:id" component={CabinetPage} />
        <Route exact path="/news" component={NewsPage} />
        <Route exact path="/news/:newsID" component={NewsItemPage} />
        <Route exact path="/messages" component={MessagesPage} />
        <Redirect from="/" to="/main"/>
        <Redirect from="/scientists" to="/main"/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
