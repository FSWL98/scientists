import React from 'react';
import logo from './logo.svg';
import './App.scss';
import {MainPage} from "./containers/MainPage";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {NewsItemPage} from "./containers/NewsItemPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/scientists/main" component={MainPage} />
        <Route exact path="/scientists/cabinet" component={MainPage} />
        <Route exact path="/scientists/news/:newsID" component={NewsItemPage} />
        <Redirect from="/scientists" to="/scientists/main"/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
