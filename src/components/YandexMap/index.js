import React, { useState, useEffect } from 'react';
import {Clusterer, Map, Placemark, YMaps} from "react-yandex-maps";
import './index.scss';

export const YandexMap = () => {
  const [points, setPoints] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const request = fetch(`http://nikelstone.pythonanywhere.com/api/v1/getpoints`, {
      method: 'GET',
      mode: 'cors',
    }).then(response => {
      return response.json();
    }).then(resp => {
      setPoints(resp);
      setLoading(false);
    })
  }, []);

  if (isLoading)
    return <div>Загрузка..</div>;
  return (
    <YMaps>
      <Map
        defaultState={{ center: [55.76, 37.64], zoom: 3 }}
        style={{ borderRadius: '20px', width: '68vw', height: '32vw', minHeight: '400px' }}
      >
        <Clusterer modules={['clusterer.addon.balloon']} options={{ clusterDisableClickZoom: true }} properties={{ balloonContent: '<div>Балунчик</div>'}}>
          {points.map(el => (
            <Placemark
              geometry={el.geometry ? el.geometry.coordinates || [54.873745, 38.064718] : [54.873745, 38.064718]}
              properties={{ balloonContent: el.ymapshortcut, hintContent: 'hint', balloonContentHeader: 'header' }}
              modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
            />
          ))}
        </Clusterer>
      </Map>
    </YMaps>
  )
};