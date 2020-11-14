import React, { useState } from 'react';
import { FindForm } from "../../components/FindForm";
import './index.scss';
import { ButtonsGroup } from "../../components/ButtonsGroup";
import map from '../../assets/map.png';
import { NewsBlock } from "../../components/NewsBlock";
import { YMaps, Map, Clusterer, Placemark } from "react-yandex-maps";
import {SideBlock} from "../../components/SideBlock";

export const MainPage = props => {
  const [points, setPoints] = useState([
    {
      geometry: {
        coordinates: [54.873745, 38.064718],
        type: 'Point',
      },
      type: 'Feature',
      properties: {
        balloonContent: '<div class="balloon-content">\n' +
          '        <div class="balloon-content_person">\n' +
          '          <img src="https://vk-wiki.ru/wp-content/uploads/2019/04/male-user-profile-picture.png" alt="person" />\n' +
          '          <span class="name">Фильченков Ростислав Александрович</span>\n' +
          '        </div>\n' +
          '        <div class="balloon-content_info">\n' +
          '          <div class="balloon-content_info__line">\n' +
          '            <span class="image location"></span>\n' +
          '            <span class="text">Центральный Федеральный Округ, Москва</span>\n' +
          '          </div>\n' +
          '          <div class="balloon-content_info__line">\n' +
          '            <span class="image expertise"></span>\n' +
          '            <span class="text">Биоинженерия</span>\n' +
          '          </div>\n' +
          '        </div>\n' +
          '      </div>'
      }
    },
    {
      geometry: {
        coordinates: [55.873745, 38.064718],
        type: 'Point',
      },
      type: 'Feature',
    }
  ]);

  return (
    <div className="main-page">
      <SideBlock page="cabinet" match={props.match} />
      <div className="main-page_right">
        <ButtonsGroup />
        <YMaps>
          <Map
            defaultState={{ center: [55.76, 37.64], zoom: 3 }}
            style={{ borderRadius: '20px', width: '100%', height: '22vw', minHeight: '300px' }}
          >
            <Clusterer modules={['clusterer.addon.balloon']}>
              {points.map(el => (
                <Placemark
                  geometry={el.geometry.coordinates}
                  properties={el.properties}
                  modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                />
              ))}
            </Clusterer>
          </Map>
        </YMaps>
        <NewsBlock />
      </div>
    </div>
  );
};