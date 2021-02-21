import React from 'react';
import logo from "../../assets/logo.svg";
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
      {props.page === 'main' ?
        <FindForm
          currentDistrict={props.currentDistrict}
          setDistrict={props.setDistrict}
          currentRegion={props.currentRegion}
          setRegion={props.setRegion}
          currentDegree={props.currentDegree}
          setDegree={props.setDegree}
          currentMajor={props.currentMajor}
          setMajor={props.setMajor}
          keyWords={props.keyWords}
          setKeyWords={props.setKeyWords}
          handleSubmit={props.handleSubmit}
          isLoading={props.isLoading}
        />
        :
        <NavigationLinks match={props.match} />}
    </div>
  )
};