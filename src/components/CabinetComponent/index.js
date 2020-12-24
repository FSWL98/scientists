import React, { useState, useEffect } from 'react';
import './index.scss';
import logo from '../../assets/logo512.png';
import { Link, useHistory } from "react-router-dom";
import {InfoBlock} from "./InfoBlock";
import AuthService from "../../services/AuthService";
import scientistsService from "../../services/scientistsService";
import Button from "@material-ui/core/Button";

export const CabinetComponent = props => {
  const [dataState, setDataState] = useState({
    isLoading: true,
    person: null,
    isLogged: AuthService.getAuthToken(),
  });
  const [gettingRoomId, setGettingRoomId] = useState(false);
  const history = useHistory();
  useEffect(() => {
    setDataState({
      ...dataState,
      isLoading: true,
    });
    if (!AuthService.getAuthToken()) {
      setDataState({
        person: null,
        isLoading: false,
        isLogged: false
      });
    }
    else if (!props.match.params.id && !props.match.path.includes('edit')) {
      history.push(`/profile/${AuthService.getUserLocal().id}`);
    }
    else {
      scientistsService.getScientist(props.match.params.id || AuthService.getUserLocal().id)
        .then(response => {
          setDataState({
            ...dataState,
            person: response,
            isLoading: false,
            isLogged: true
          })
        })
    }
  }, [props]);

  if (dataState.isLoading)
    return '';

  if (!dataState.isLogged)
    return (
      <section className="cabinet">
        <p className="unauthorized-text">Вы не авторизованы. Пожалуйста, войдите в систему, используя кнопку в верхнем меню навигации.</p>
      </section>
    );

  return (
    <section className="cabinet">
      {!props.edit && (
        <section className="cabinet_main-info">
          <div className="person">
            <img src={dataState.person.image || logo} alt="avatar" />
            <span className="name">
              {`${dataState.person.surname} ${dataState.person.name} ${dataState.person.patronymic}`}
            </span>
            <span className="email">
              {dataState.person.email}
            </span>
            <span className="elib">
              SPIN РИНЦ: <a href={dataState.person.elib_link} target="_blank">{dataState.person.elibID || 'Не указан'}</a>
            </span>
          </div>
          <div className="contacts">
            {dataState.person.id !== AuthService.getUserLocal().id && (
              <Button
                onClick={() => {
                  setGettingRoomId(true);
                  scientistsService.createChat(dataState.person.id, AuthService.getUserLocal().id)
                    .then(response => {
                      setGettingRoomId(false);
                      history.push(`/messages/${response.room_id}`)
                    })
                }}
                disabled={gettingRoomId}
              >
                {gettingRoomId ? 'Загрузка...' : 'Написать сообщение'}
              </Button>
            )}
            <a href={`tel:${dataState.person.phone}`} className="phone">
              {dataState.person.phone || 'Телефон не указан'}
            </a>
          </div>
          <div className="indexes">
            <div className="indexes_item">
              <span className="number">
                {dataState.person.h_Scopus || '-'}
              </span>
              <a className="name" href={dataState.person.scopusLink} target="_blank">
                Scopus
              </a>
            </div>
            <div className="indexes_item">
              <span className="number">
                {dataState.person.h_WebOfScience || '-'}
              </span>
              <a className="name" href={dataState.person.WoSLink} target="_blank">
                Web of Science
              </a>
            </div>
          </div>
        </section>
      )}
      <InfoBlock edit={props.edit} info={dataState.person} />
    </section>
  )
};