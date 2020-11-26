import React, { useState, useEffect } from 'react';
import './index.scss';
import logo from '../../assets/logo512.png';
import {Link} from "react-router-dom";
import {InfoBlock} from "./InfoBlock";

const person = {
  id: 4,
  name: 'Александр',
  surname: 'Римский-Корсаков',
  patronymic: 'Серафимович',
  Bigregion: 'sfo',
  region: 'Кемеровская область',
  job_place: 'ITS',
  position: 'Frontend developer',
  academicDegree: 'kandidat',
  codeSpeciality: 'korpcy',
  academicTitle: 'docs',
  mainResults: 'Блаблабалбалаблабалаблаблабалбла Я крутой ученый БлаБлабЛа делал это и вот это и еще вот такое тоже делал',
  keyWords: ['React', 'JavaScript'],
  phone_number: '9-999-999-9999',
  email: 'greatname@email.com',
  publications: ['gdfpgkd'],
  image: 'https://nikelstone.pythonanywhere.com/media/images/scientistPhoto/default.png',
  elibID: '981051',
  elib_link: 'www.elibrary.ru',
  h_Scopus: '7',
  scopusLink: 'https://www.scopus.com/',
  h_WebOfScience: '3',
  WoSLink: 'https://publons.com/about/home/',
};

export const CabinetComponent = props => {
  return (
    <section className="cabinet">
      {!props.edit && (
        <section className="cabinet_main-info">
          <div className="person">
            <img src={person.image || logo} alt="avatar" />
            <span className="name">
              {`${person.surname} ${person.name} ${person.patronymic}`}
            </span>
            <span className="email">
              {person.email}
            </span>
            <span className="elib">
              SPIN РИНЦ: <a href={person.elib_link} target="_blank">{person.elibID}</a>
            </span>
          </div>
          <div className="contacts">
            <Link to={`/scientists/message/${person.id}`}>Написать сообщение</Link>
            <a href={`tel:${person.phone_number}`} className="phone">
              {person.phone_number}
            </a>
          </div>
          <div className="indexes">
            <div className="indexes_item">
              <span className="number">
                {person.h_Scopus}
              </span>
              <a className="name" href={person.scopusLink} target="_blank">
                Scopus
              </a>
            </div>
            <div className="indexes_item">
              <span className="number">
                {person.h_WebOfScience}
              </span>
              <a className="name" href={person.WoSLink} target="_blank">
                Web of Science
              </a>
            </div>
          </div>
        </section>
      )}
      <InfoBlock edit={props.edit} info={person} />
    </section>
  )
};