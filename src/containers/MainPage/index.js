import React, { useState } from 'react';
import './index.scss';
import { ButtonsGroup } from "../../components/ButtonsGroup";
import { NewsBlock } from "../../components/NewsBlock";
import {SideBlock} from "../../components/SideBlock";
import {YandexMap} from "../../components/YandexMap";

export const MainPage = props => {
  return (
    <div className="main-page">
      <SideBlock page={props.match.path.split('/', 3)[2]} match={props.match} />
      <div className="main-page_right">
        <ButtonsGroup />
        <YandexMap />
        <NewsBlock />
      </div>
    </div>
  );
};