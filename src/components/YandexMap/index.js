import React, { useState, useEffect } from 'react';
import {Clusterer, Map, Placemark, withYMaps} from "react-yandex-maps";
import './index.scss';
import {baseURL} from "../../services/baseURL";

const YandexMap = props => {
  const [points, setPoints] = useState([]);
  const [coords, setCoords] = useState([54.873745, 38.064718]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // props.ymaps.geocode('Кемеровская область', {results: 1})
    //   .then(response =>
    //     setCoords(response.geoObjects.get(0).geometry.getCoordinates())
    //   );
    const request = fetch(`${baseURL}/api/v1/getpoints/`, {
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
      <Map
        defaultState={{ center: [55.76, 37.64], zoom: 3 }}
        style={{ borderRadius: '20px', width: '68vw', height: '32vw', minHeight: '400px' }}
        modules={['geocode']}
      >
        <Clusterer modules={['clusterer.addon.balloon']} options={{ clusterDisableClickZoom: true }} properties={{ balloonContent: '<div>Балунчик</div>'}}>
          {points.map(el => (
            <Placemark
              key={el.id}
              geometry={el.geometry ? el.geometry.coordinates || coords : coords}
              properties={{
                balloonContent: el.ymaps,
                hintContent: 'hint',
                balloonContentHeader: `${el.surname} ${el.name[0].toUpperCase()}. ${el.patronymic[0].toUpperCase()}.` }}
              modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
            />
          ))}
        </Clusterer>
      </Map>
  )
};

export default withYMaps(YandexMap, true, ['geocode', 'regions']);