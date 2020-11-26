import React, { useState, useEffect } from 'react';
import location from '../../../assets/location.svg';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { regions, degrees, majors } from '../../FindForm/consts'
import degree from '../../../assets/degree.svg';
import job from '../../../assets/job.svg';
import add from '../../../assets/add.svg';
import remove from '../../../assets/remove.svg';
import medal from '../../../assets/medal.svg';
import expertise from '../../../assets/expertise.svg';
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import './index.scss';

export const InfoBlock = props => {
  const [info, setInfo] = useState({
    Bigregion: undefined,
    region: undefined,
    name: undefined,
    patronymic: undefined,
    surname: undefined,
    email: undefined,
    phone_number: undefined,
    elib_link: undefined,
    elibID: undefined,
    scopusLink: undefined,
    h_Scopus: undefined,
    WoSLink: undefined,
    h_WebOfScience: undefined,
    publications: undefined,
    job_place: undefined,
    position: undefined,
    academicDegree: undefined,
    codeSpeciality: undefined,
    academicTitle: undefined,
    mainResults: undefined,
    keyWords: undefined,
    image: undefined,
  });
  useEffect(() => {
    setInfo(props.info);
  }, [props.edit]);

  const handleBigRegionChange = value => {
    setInfo({
      ...info,
      Bigregion: value,
      region: '',
    });
  };

  const handleSelectChange = (value, target) => {
    setInfo({
      ...info,
      [target]: value,
    });
  };

  const handleChange = (value, target) => {
    setInfo({
      ...info,
      [target]: value,
    });
  };

  const deletePublication = index => {
    setInfo({
      ...info,
      publications: info.publications.filter((el, ind) => ind !== index),
    });
  };

  const addPublication = () => {
    setInfo({
      ...info,
      publications: [...info.publications, ''],
    });
  };

  const handleKeyWordsChange = value => {
    setInfo({
      ...info,
      keyWords: value.split('\n'),
    });
  };
  const handlePublicationChange = (value, id) => {
    setInfo({
      ...info,
      publications: info.publications.map((el, index) => {
        if (index === id)
          return value;
        return el;
      })
    });
  };

  if (!info.Bigregion)
    return '';

  return (
    <section className="info-block">
      {props.edit && (
        <div className="change-photo">
          <img src={info.image} alt="image" className="full-image" />
        </div>
      )}
      {props.edit && (
        <section className="info-block_person">
          <span className="section-title">Основная информация</span>
          <div className="section-content">
            <TextField
              value={info.name}
              id="name"
              onChange={ev => handleChange(ev.target.value, ev.target.id)}
              label="Имя"
            />
            <TextField
              value={info.surname}
              id="surname"
              onChange={ev => handleChange(ev.target.value, ev.target.id)}
              label="Фамилия"
            />
            <TextField
              value={info.patronymic}
              id="patronymic"
              onChange={ev => handleChange(ev.target.value, ev.target.id)}
              label="Отчество"
            />
            <TextField
              value={info.email}
              id="email"
              onChange={ev => handleChange(ev.target.value, ev.target.id)}
              label="E-mail"
            />
            <TextField
              value={info.phone_number}
              id="phone_number"
              onChange={ev => handleChange(ev.target.value, ev.target.id)}
              label="Номер телефона"
            />
            <TextField
              value={info.elib_link}
              id="elib_link"
              onChange={ev => handleChange(ev.target.value, ev.target.id)}
              label="Ссылка на ELibrary"
            />
            <TextField
              value={info.elibID}
              id="elibID"
              onChange={ev => handleChange(ev.target.value, ev.target.id)}
              label="ID в системе ELibrary"
            />
            <TextField
              value={info.h_Scopus}
              id="h_Scopus"
              onChange={ev => handleChange(ev.target.value, ev.target.id)}
              type="number"
              label="H-индекс в системе Scopus"
            />
            <TextField
              value={info.scopusLink}
              id="scopusLink"
              onChange={ev => handleChange(ev.target.value, ev.target.id)}
              label="Ссылка на профиль в системе Scopus"
            />
            <TextField
              value={info.h_WebOfScience}
              id="h_WebOfScience"
              onChange={ev => handleChange(ev.target.value, ev.target.id)}
              type="number"
              label="H-индекс в системе WoS"
            />
            <TextField
              value={info.WoSLink}
              id="WoSLink"
              onChange={ev => handleChange(ev.target.value, ev.target.id)}
              label="Ссылка на профиль в системе WoS"
            />
          </div>
        </section>
      )}
      <section className="info-block_main">
        <span className="section-title">Информация</span>
        <div className="section-content">
          {props.edit && (
            <>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <img src={location} alt="location" />
                </Grid>
                <Grid item>
                  <Select value={info.Bigregion} onChange={ev => handleBigRegionChange(ev.target.value)} label="Округ" variant="outlined">
                    {regions.map(el => <MenuItem value={el.code} key={el.code}>{el.name}</MenuItem>)}
                  </Select>
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <img src={location} alt="location" />
                </Grid>
                <Grid item>
                  <Select value={info.region} onChange={ev => handleSelectChange(ev.target.value, 'region')} label="Регион" variant="outlined">
                    {regions.find(el => el.code === info.Bigregion).regions.map(el => (
                      <MenuItem value={el.name} key={el.id}>{el.name}</MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <img src={expertise} alt="expertise" />
                </Grid>
                <Grid item>
                  <Select
                    value={info.codeSpeciality}
                    onChange={ev => handleSelectChange(ev.target.value, 'codeSpeciality')}
                    label="Специализация"
                    variant="outlined"
                  >
                    {majors.map(el => (
                      <MenuItem value={el.code} key={el.code}>{el.name}</MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <img src={degree} alt="degree" />
                </Grid>
                <Grid item>
                  <Select
                    value={info.academicDegree}
                    onChange={ev => handleSelectChange(ev.target.value, 'academicDegree')}
                    label="Ученая степень"
                    variant="outlined"
                  >
                    {degrees.map(el => (
                      <MenuItem value={el.code} key={el.code}>{el.name}</MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <img src={medal} alt="medal" />
                </Grid>
                <Grid item>
                  <Select
                    value={info.codeSpeciality}
                    onChange={ev => handleSelectChange(ev.target.value, 'codeSpeciality')}
                    label="Ученое звание"
                    variant="outlined"
                  >
                    {majors.map(el => (
                      <MenuItem value={el.code} key={el.code}>{el.name}</MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <img src={job} alt="job" />
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    label="Место работы"
                    value={info.job_place}
                    onChange={ev => handleSelectChange(ev.target.value, 'job_place')}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <img src={job} alt="job" />
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    label="Должность"
                    value={info.position}
                    onChange={ev => handleSelectChange(ev.target.value, 'position')}
                  />
                </Grid>
              </Grid>
            </>
          )}
          {!props.edit && (
            <>
              <div className="item">
                <img src={location} alt="location" />
                <span>{`${regions.find(el => el.code === info.Bigregion).name}, ${info.region}`}</span>
              </div>
              <div className="item">
                <img src={expertise} alt="expertise" />
                <span>{`${majors.find(el => el.code === info.codeSpeciality).name}`}</span>
              </div>
              <div className="item">
                  <img src={degree} alt="degree" />
                  <span>{`${degrees.find(el => el.code === info.academicDegree).name}`}</span>
              </div>
              <div className="item">
                  <img src={medal} alt="medal" />
                  <span>{info.academicTitle}</span>
              </div>
              <div className="item">
                  <img src={job} alt="job" />
                  <span>{info.job_place}, {info.position}</span>
              </div>
            </>
          )}
        </div>
      </section>
      <section className="info-block_main-results">
        <span className="section-title">Основные результаты исследовательской деятельности</span>
        <TextField
          value={info.mainResults}
          multiline
          rowsMax={3}
          rows={3}
          disabled={!props.edit}
          className="with-background"
          onChange={ev => handleSelectChange(ev.target.value, 'mainResults')}
        />
      </section>
      <section className="info-block_key-words">
        <span className="section-title">Ключевые слова исследований</span>
        {props.edit && (
          <>
            <span className="tip">Каждое ключевое слово нужно указывать с новой строки</span>
            <TextField
              value={info.keyWords.join('\n')}
              multiline
              rows={3}
              rowsMax={3}
              onChange={ev => handleKeyWordsChange(ev.target.value)}
            />
          </>
        )}
        {!props.edit && (
          <div className="keywords">
            {info.keyWords.map(el => <span>#{el}</span>)}
          </div>
        )}
      </section>
      <section className="info-block_publications">
        <span className="section-title">Публикации</span>
        <div className="section-content">
          {info.publications.map((el, index) => (
            <div className="publication">
              <TextField
                value={el}
                id={`${index}`}
                disabled={!props.edit}
                onChange={ev => handlePublicationChange(ev.target.value, index)}
              />
              {props.edit && (
                <img src={remove} alt="clear" onClick={() => deletePublication(index)}/>
              )}
            </div>
          ))}
          {props.edit && (
            <div className="new-publication" onClick={() => addPublication()}>
              <img src={add} alt="add" />
              <span>Добавить публикацию</span>
            </div>
          )}
        </div>
      </section>
      {props.edit && (
        <Button variant="contained" className="primary">Сохранить</Button>
      )}
    </section>
  )
};