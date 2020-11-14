import React from 'react';
import logo from "../../assets/Logo.svg";
import {FindForm} from "../FindForm";
import './index.scss';
import {NavigationLinks} from "../NavigationLinks";

export const SideBlock = props => {
  return (
    <div className="side-block">
      <img src={logo} alt="Логотип" className="side-block__logo"/>
      <p className="side-block_scientists">
        Поиск исследователей в нужном регионе по заданным параметрам
      </p>
      {props.page === 'main' ? <FindForm /> : <NavigationLinks match={props.match} />}
    </div>
  )
};