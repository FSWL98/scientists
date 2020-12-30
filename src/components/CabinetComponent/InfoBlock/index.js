import React, { useState, useEffect } from 'react';
import location from '../../../assets/location.svg';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { regions, degrees, majors, titles } from '../../FindForm/consts'
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
import ReactCrop from 'react-image-crop';
import { useDropzone } from "react-dropzone";
import './index.scss';
import Dialog from "@material-ui/core/Dialog";
import 'react-image-crop/dist/ReactCrop.css';
import Checkbox from "@material-ui/core/Checkbox";
import {FormControl} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import scientistsService from "../../../services/scientistsService";
import AuthService from "../../../services/AuthService";

export const InfoBlock = props => {
  const [info, setInfo] = useState({
    Bigregion: undefined,
    region: undefined,
    name: undefined,
    patronymic: undefined,
    surname: undefined,
    email: undefined,
    phone: undefined,
    elib_link: undefined,
    elibID: undefined,
    scopusLink: undefined,
    h_Scopus: undefined,
    WoSLink: undefined,
    h_WebOfScience: undefined,
    publication: undefined,
    job_place: undefined,
    position: undefined,
    academicDegree: undefined,
    codeSpeciality: undefined,
    academicTitle: undefined,
    mainResults: undefined,
    keyWords: undefined,
    image: undefined,
    newImageFile: undefined,
    hide_email: true,
    hide_phone: true,
  });
  const [cropModal, setCropModal] = useState({
    image: null,
    open: false,
    crop: {
      unit: 'px',
      width: 128,
      aspect: 1 / 1,
      minWidth: 128,
      maxWidth: 512,
    }
  });
  const [imageRef, setImageRef] = useState(null);
  const [currentCropped, setCurrentCropped] = useState(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setInfo({
      ...props.info,
      publication: props.info.publication.split('&^')
    });
  }, [props.edit]);

  const handleBigRegionChange = value => {
    setInfo({
      ...info,
      Bigregion: value,
      region: '',
    });
  };

  const handleSelectChange = (value, target) => {
    console.log(target, value);
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

  // удаление публикации
  const deletePublication = index => {
    setInfo({
      ...info,
      publication: info.publication.filter((el, ind) => ind !== index),
    });
  };

  // добавление новой публикации
  const addPublication = () => {
    setInfo({
      ...info,
      publication: [...info.publication, ''],
    });
  };

  // обработка изменения поля ключевых слов
  const handleKeyWordsChange = value => {
    setInfo({
      ...info,
      keyWords: value,
    });
  };

  // обработка изменения поля публикаций
  const handlePublicationChange = (value, id) => {
    setInfo({
      ...info,
      publication: info.publication.map((el, index) => {
        if (index === id)
          return value;
        return el;
      })
    });
  };

  const handleImageLoaded = image => {
    setImageRef(image);
    return false;
  };

  const makeClientCrop = crop => {
    if (imageRef && crop.width && crop.height) {
      getCroppedImage(imageRef, crop).then(response => setCurrentCropped(response));
    }
  };

  // обработка кроппированной картинки
  const getCroppedImage = (image, crop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          return;
        }
        blob.name = 'avatar';
        resolve(blob);
      }, 'image/*');
    })

  };

  const handleCropComplete = crop => {
    makeClientCrop(crop);
  };

  // обработка отправки формы
  const handleSave = ev => {
    ev.preventDefault();
    setLoading(true);
    const data = {
      name: info.name || '',
      surname: info.surname || '',
      patronymic: info.patronymic || '',
      Bigregion: info.Bigregion || 'cfo',
      region: info.region || '',
      WoSLink: info.WoSLink || '',
      scopusLink: info.scopusLink || '',
      h_Scopus: info.h_Scopus || '',
      h_WebOfScience: info.h_WebOfScience || '',
      academicDegree: info.academicDegree === 'none' ? '' : (info.academicDegree || ''),
      academicTitle: info.academicTitle === 'none' ? '' : (info.academicTitle || ''),
      codeSpeciality: info.codeSpeciality === 'none' ? '' : (info.codeSpeciality || ''),
      email: info.email || '',
      elib_link: info.elib_link || '',
      elibID: info.elibID || '',
      publication:info.publication ? info.publication.join('&^') : '',
      mainResults: info.mainResults || '',
      keyWords: info.keyWords ? info.keyWords.split('\n').join(';') : '',
      phone: info.phone || '',
      job_place: info.job_place || '',
      position: info.position || '',
      hide_phone: info.hide_phone,
      hide_email: info.hide_email
    };
    if (info.newImageFile) {
      data.image = new File(
        [info.newImageFile],
        `avatar_${info.id}.${info.newImageFile.type.split('/')[1]}`,
        { type: info.newImageFile.type }
      );
    }
    scientistsService.patchUser(data, info.id).then(response => {
      if (response.image) {
        const user = AuthService.getUserLocal();
        user.image = response.image;
        user.name = `${response.surname} ${response.name} ${response.patronymic}`
        localStorage.setItem('user', JSON.stringify(user));
      }
      setLoading(false);
    })
      .catch(() => setLoading(false));
  };

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    maxFiles: 1,
  });

  // хук жизненного цикла, срабатывающий при добавлении файла в поле
  useEffect(() => {
    if (acceptedFiles.length === 1) {
      setCropModal({
        image: acceptedFiles[0],
        open: true,
        crop: {
          unit: 'px',
          width: 128,
          aspect: 1 / 1,
          minWidth: 128,
          maxWidth: 512,
        }
      });
    }
  }, [acceptedFiles])

  if (!info.id)
    return '';

  return (
    <section className="info-block">
      <Dialog
        open={cropModal.open}
        onClose={() => setCropModal({
          open: false,
          image: null,
          crop: {
            unit: 'px',
            width: 128,
            aspect: 1 / 1,
            minWidth: 128,
            maxWidth: 512,
          }
        })}
        className="crop-modal"
      >
        <ReactCrop
          src={cropModal.open ? URL.createObjectURL(cropModal.image) : ''}
          crop={cropModal.crop}
          onImageLoaded={handleImageLoaded}
          onComplete={crop => handleCropComplete(crop)}
          onChange={crop => setCropModal({...cropModal, crop })}
          minWidth={128}
          maxWidth={512}
        />
        {currentCropped && (
          <div className="images">
            <img src={URL.createObjectURL(currentCropped)} alt="big" className="big" />
            <img src={URL.createObjectURL(currentCropped)} alt="medium" className="medium" />
            <img src={URL.createObjectURL(currentCropped)} alt="small" className="small" />
          </div>
        )}
        <div className="action-buttons">
          <Button
            className="primary"
            variant="contained"
            disabled={!currentCropped}
            onClick={() => {
              setInfo({...info, image: URL.createObjectURL(currentCropped), newImageFile: currentCropped });
              setCurrentCropped(null);
              setCropModal({
                open: false,
                image: null,
                crop: {
                  unit: 'px',
                  width: 128,
                  aspect: 1 / 1,
                  minWidth: 128,
                  maxWidth: 512,
                }
              });
            }}
          >
            Сохранить
          </Button>
          <Button
            className="default"
            variant="contained"
            onClick={() => {
              setCurrentCropped(null);
              setCropModal({
                open: false,
                image: null,
                crop: {
                  unit: 'px',
                  width: 128,
                  aspect: 1 / 1,
                  minWidth: 128,
                  maxWidth: 512,
                }
              });
            }}
          >
            Отменить
          </Button>
        </div>
      </Dialog>
      {props.edit && info.image && (
        <section className="info-block_image">
          <span className="section-title">Изменить фотографию профиля</span>
          <div {...getRootProps({className: "change-photo"})}>
            <input {...getInputProps()} accept="image/png, image/jpg, image/jpeg"/>
            <img src={info.image} alt="image" className="full-image" />
            <div className="fade">Изменить</div>
          </div>
        </section>
      )}
      <form onSubmit={ev => handleSave(ev)}>
      {props.edit && (
        <section className="info-block_person">
          <span className="section-title">Основная информация</span>
          <div className="section-content">
            <TextField
              value={info.name}
              id="name"
              onChange={ev => handleChange(ev.target.value, ev.target.id)}
              label="Имя"
              required
            />
            <TextField
              value={info.surname}
              id="surname"
              onChange={ev => handleChange(ev.target.value, ev.target.id)}
              label="Фамилия"
              required
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
              value={info.phone}
              id="phone"
              onChange={ev => handleChange(ev.target.value, ev.target.id)}
              label="Номер телефона"
            />
          </div>
          <span className="section-title">E-library</span>
          <div className="section-content">
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
          </div>
          <span className="section-title">Scopus</span>
          <div className="section-content">
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
          </div>
          <span className="section-title">Web of Science</span>
          <div className="section-content">
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
                  <Select value={info.Bigregion} onChange={ev => handleBigRegionChange(ev.target.value)} label="Округ" variant="outlined" required>
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
                    {info.Bigregion ? regions.find(el => el.code === info.Bigregion).regions.map(el => (
                      <MenuItem value={el.name} key={el.id}>{el.name}</MenuItem>
                    )) : null}
                  </Select>
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <img src={expertise} alt="expertise" />
                </Grid>
                <Grid item>
                  <Select
                    value={info.codeSpeciality || 'none'}
                    onChange={ev => handleSelectChange(ev.target.value, 'codeSpeciality')}
                    label="Специализация"
                    variant="outlined"
                  >
                    <MenuItem value="none">Не выбрана</MenuItem>
                    {majors.map(el => (
                      <MenuItem value={el.name} key={el.code}>{el.name}</MenuItem>
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
                    value={info.academicDegree || 'none'}
                    onChange={ev => handleSelectChange(ev.target.value, 'academicDegree')}
                    label="Ученая степень"
                    variant="outlined"
                  >
                    <MenuItem value="none">Не выбрана</MenuItem>
                    {degrees.map(el => (
                      <MenuItem value={el.name} key={el.code}>{el.name}</MenuItem>
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
                    value={info.academicTitle || 'none'}
                    onChange={ev => handleSelectChange(ev.target.value, 'academicTitle')}
                    label="Ученое звание"
                    variant="outlined"
                  >
                    <MenuItem value="none">Не выбрано</MenuItem>
                    {titles.map(el => (
                      <MenuItem value={el.name} key={el.code}>{el.name}</MenuItem>
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
                <span className="image-container"><img src={location} alt="location" /></span>
                <span>
                  {info.Bigregion ?
                    `${regions.find(el => el.code === info.Bigregion).name},
                    ${info.region || 'Регион не указан'}`
                    : 'Hе указан'}
                </span>
              </div>
              <div className="item moved">
                <span className="image-container"><img src={degree} alt="degree" /></span>
                <span>{info.academicDegree || 'Не указан'}</span>
              </div>
              <div className="item">
                <span className="image-container"><img src={expertise} alt="expertise" /></span>
                <span>{info.codeSpeciality || 'Не указан'}</span>
              </div>
              <div className="item moved">
                <span className="image-container"><img src={medal} alt="medal" /></span>
                <span>{info.academicTitle || 'Не указан'}</span>
              </div>
              <div className="item">
                  <span className="image-container"><img src={job} alt="job" /></span>
                {info.job_place && (<span>{info.job_place}, {info.position || 'Позиция не указана'}</span>)}
                {!info.job_place && (<span>Не указан</span>)}
              </div>
              {info.dier_sovet && (
                <div className="item">
                  <span className="text">{info.dier_sovet}</span>
                </div>
              )}
              {info.editorial_boards && (
                <div className="item">
                  <span className="text">{info.editorial_boards}</span>
                </div>
              )}
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
              value={info.keyWords.split(';').join('\n')}
              multiline
              rows={3}
              rowsMax={3}
              onChange={ev => handleKeyWordsChange(ev.target.value)}
            />
          </>
        )}
        {!props.edit && (
          <div className="keywords">
            {info.keyWords ? info.keyWords.split(';').map(el => {
              if (el)
                return <span>#{el}</span>;
              return null;
            }) : <span>Не указаны</span>}
          </div>
        )}
      </section>
      <section className="info-block_publications">
        <span className="section-title">Публикации</span>
        <div className="section-content">
          {info.publication.length > 0 && info.publication.map((el, index) => (
            <div className="publication">
              <TextField
                value={el}
                id={`${index}`}
                disabled={!props.edit}
                onChange={ev => handlePublicationChange(ev.target.value, index)}
                multiline={!props.edit}
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
        <section className="info-block_privacy">
          <span className="section-title">Настройки приватности</span>
          <FormControlLabel
            label="Скрывать номер телефона от неавторизованных пользователей"
            control={
              <Checkbox
                checked={info.hide_phone}
                onChange={() => setInfo({...info, hide_phone: !info.hide_phone })}
                color="primary"
              />
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={info.hide_email}
                onChange={() => setInfo({ ...info, hide_email: !info.hide_email })}
                color="primary"
              />
            }
            label="Скрывать адрес электронной почты от неавторизованных пользователей"
          />
        </section>
      )}
      {props.edit && (
        <Button
          variant="contained"
          className="primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Подождите, идет сохранение' : 'Сохранить'}
        </Button>
      )}
      </form>
    </section>
  )
};