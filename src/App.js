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
        <Route exact path="/scientists/main" component={MainPage} />
        <Route exact path="/scientists/profile" component={CabinetPage} />
        <Route exact path="/scientists/profile/edit" component={CabinetPage} />
        <Route exact path="/scientists/profile/:id" component={CabinetPage} />
        <Route exact path="/scientists/news" component={NewsPage} />
        <Route exact path="/scientists/news/:newsID" component={NewsItemPage} />
        <Route exact path="/scientists/messages" component={MessagesPage} />
        <Redirect from="/" to="/scientists/main"/>
        <Redirect from="/scientists" to="/scientists/main"/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
