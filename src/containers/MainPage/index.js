import React, { useState } from 'react';
import './index.scss';
import { ButtonsGroup } from "../../components/ButtonsGroup";
import { NewsBlock } from "../../components/NewsBlock";
import {SideBlock} from "../../components/SideBlock";
import YandexMap from "../../components/YandexMap";
import {YMaps} from "react-yandex-maps";

export const MainPage = props => {
  return (
    <div className="main-page">
      <SideBlock page={props.match.path.split('/', 3)[2]} match={props.match} />
      <div className="main-page_right">
        <ButtonsGroup />
        <YMaps query={{
          apikey: '057905fb-544c-4be6-a25e-41f05ae9aeb5',
        }}>
          <YandexMap />
        </YMaps>
        <NewsBlock />
      </div>
    </div>
  );
};