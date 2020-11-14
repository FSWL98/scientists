import React from 'react';
import logo from './logo.svg';
import './App.scss';
import {MainPage} from "./containers/MainPage";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {NewsItemPage} from "./containers/NewsItemPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/cabinet" component={MainPage} />
        <Route exact path="/news/:newsID" component={NewsItemPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
