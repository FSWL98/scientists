import React, { useState, useEffect } from 'react';
import './index.scss';
import logo from '../../assets/logo512.png';
import {Link} from "react-router-dom";
import {InfoBlock} from "./InfoBlock";
import AuthService from "../../services/AuthService";
import scientistsService from "../../services/scientistsService";

export const CabinetComponent = props => {
  const [dataState, setDataState] = useState({
    isLoading: true,
    person: null,
    isLogged: AuthService.getAuthToken(),
  });
  useEffect(() => {
    setDataState({
      ...dataState,
      isLoading: true,
    });
    if (AuthService.getAuthToken()) {
      scientistsService.getScientist(1)
        .then(response => {
          setDataState({
            ...dataState,
            person: response,
            isLoading: false,
          })
        })
    }
  }, []);

  if (dataState.isLoading)
    return '';

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
              SPIN РИНЦ: <a href={dataState.person.elib_link} target="_blank">{dataState.person.elibID}</a>
            </span>
          </div>
          <div className="contacts">
            <Link to={`/scientists/message/${dataState.person.id}`}>Написать сообщение</Link>
            <a href={`tel:${dataState.person.phone_number}`} className="phone">
              {dataState.person.phone_number}
            </a>
          </div>
          <div className="indexes">
            <div className="indexes_item">
              <span className="number">
                {dataState.person.h_Scopus}
              </span>
              <a className="name" href={dataState.person.scopusLink} target="_blank">
                Scopus
              </a>
            </div>
            <div className="indexes_item">
              <span className="number">
                {dataState.person.h_WebOfScience}
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