import React, { useState, useEffect } from 'react';
import {Clusterer, Map, Placemark, withYMaps} from "react-yandex-maps";
import './index.scss';

const YandexMap = props => {
  const [coords, setCoords] = useState([54.873745, 38.064718]);
  const getCoords = index => {
    if (index % 2 === 0) {
      props.ymaps.geocode('Кемеровская область', {results: 1})
        .then(response => {
          console.log(response.geoObjects.get(0).geometry.getCoordinates())
            return response.geoObjects.get(0).geometry.getCoordinates();
          }
        );
    }
    else return [54.873745, 38.064718];
  }

  if (!props.points)
    return <div>Загрузка..</div>;
  return (
      <Map
        defaultState={{ center: [55.76, 37.64], zoom: 3 }}
        style={{ borderRadius: '20px', width: '100%', marginTop: '20px', minHeight: '49%' }}
        modules={['geocode']}
      >
        <Clusterer
          modules={['clusterer.addon.balloon']}
          options={{
            clusterDisableClickZoom: true,
            iconColor: '#ff0046',
            iconContentLayout: 'fdskjbg',
            cursor: 'default'
          }}
          properties={{ balloonContent: '<div>Балунчик</div>'}}
        >
          {props.points.map(el => (
            <Placemark
              key={el.id}
              geometry={coords}
              properties={{
                balloonContent: el.ymapshortcut,
                hintContent: 'hint',
                balloonContentHeader: `${el.surname} ${el.name[0].toUpperCase()}. ${el.patronymic[0] ? el.patronymic.toUpperCase()[0] + '.' : ''}` }}
              options={{
                iconColor: '#ff0046'
              }}
              modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
            />
          ))}
        </Clusterer>
      </Map>
  )
};

export default withYMaps(YandexMap, true, ['geocode', 'regions']);