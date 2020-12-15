import React, {useEffect, useState} from 'react';
import './index.scss';
import { ButtonsGroup } from "../../components/ButtonsGroup";
import { NewsBlock } from "../../components/NewsBlock";
import {SideBlock} from "../../components/SideBlock";
import YandexMap from "../../components/YandexMap";
import {YMaps} from "react-yandex-maps";
import scientistsService from "../../services/scientistsService";

export const MainPage = props => {
  const [currentDistrict, setDistrict] = useState({});
  const [currentRegion, setRegion] = useState({});
  const [currentDegree, setDegree] = useState({});
  const [currentMajor, setMajor] = useState({});
  const [keyWords, setKeyWords] = useState('');
  const [points, setPoints] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getPoints();
  }, [])

  const getPoints = () => {
    setLoading(true);
    scientistsService.getPoints(currentDistrict.code, currentRegion.name, currentMajor.name, currentDegree.name, keyWords)
      .then(response => {
        setPoints(response);
        setLoading(false);
    });
  }
  return (
    <div className="main-page">
      <SideBlock
        page={props.match.path.split('/', 3)[2]}
        match={props.match}
        currentDistrict={currentDistrict}
        setDistrict={setDistrict}
        currentRegion={currentRegion}
        setRegion={setRegion}
        currentDegree={currentDegree}
        setDegree={setDegree}
        currentMajor={currentMajor}
        setMajor={setMajor}
        keyWords={keyWords}
        setKeyWords={setKeyWords}
        handleSubmit={getPoints}
        isLoading={isLoading}
      />
      <div className="main-page_right">
        <ButtonsGroup />
        <YMaps query={{
          apikey: '057905fb-544c-4be6-a25e-41f05ae9aeb5',
        }}>
          <YandexMap points={points}/>
        </YMaps>
        <NewsBlock />
      </div>
    </div>
  );
};