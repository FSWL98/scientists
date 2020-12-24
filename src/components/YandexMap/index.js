import React, {useState, useEffect, useMemo} from 'react';
import {Clusterer, Map, Placemark, withYMaps} from "react-yandex-maps";
import './index.scss';
import {regions} from "../FindForm/consts";

const YandexMap = props => {
  const [coords, setCoords] = useState([54.873745, 38.064718]);
  const getCoords = point => {
    if (point.region) {
      return regions.find(el => el.code === point.Bigregion).regions.find(el => el.name === point.region).coordinates;
    }
    else if (point.Bigregion) {
      return regions.find(el => el.code === point.Bigregion).coordinates;
    }
  }

  console.log('im inside provider')

  if (!props.points)
    return <div>Загрузка..</div>;
  return (
      <Map
        defaultState={{ center: [55.76, 37.64], zoom: 3 }}
        style={{ borderRadius: '20px', width: '100%', marginTop: '20px', minHeight: '50%' }}
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
              geometry={getCoords(el)}
              properties={{
                balloonContent: el.ymapshortcut,
                balloonContentHeader: `${el.surname} ${el.name[0].toUpperCase()}. ${el.patronymic[0] ? el.patronymic.toUpperCase()[0] + '.' : ''}` }}
              options={{
                iconColor: '#596EEF'
              }}
              modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
            />
          ))}
        </Clusterer>
      </Map>
  )
};

export default withYMaps(YandexMap, true, ['geocode', 'regions']);