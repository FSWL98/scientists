import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import {MainPage} from "./containers/MainPage";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {NewsItemPage} from "./containers/NewsItemPage";
import {CabinetPage} from "./containers/CabinetPage";
import AuthService from "./services/AuthService";

function App() {
  useEffect(() => {
    if (AuthService.getAuthToken())
      AuthService.checkAuth().then(response => {
        if (response.error) {
          AuthService.logout();
          window.location.reload();
        }
      })
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/scientists/main" component={MainPage} />
        <Route exact path="/scientists/cabinet" component={CabinetPage} />
        <Route exact path="/scientists/cabinet/edit" component={CabinetPage} />
        <Route exact path="/scientists/news" component={MainPage} />
        <Route exact path="/scientists/news/:newsID" component={NewsItemPage} />
        <Route exact path="/scientists/messages" component={MainPage} />
        <Redirect from="/scientists" to="/scientists/main"/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
