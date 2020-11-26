import React, { useState } from 'react';
import './index.scss';
import logo from '../../assets/Logo.svg';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { regions, degrees, majors } from './consts';


export const FindForm = () => {
  const [currentDistrict, setDistrict] = useState({});
  const [currentRegion, setRegion] = useState({});
  const [currentDegree, setDegree] = useState({});
  const [currentMajor, setMajor] = useState({});

  return (
      <form className="find-form">
        <FormControl className="district" variant="outlined">
          <InputLabel id="district">Введите округ</InputLabel>
          <Select
            labelId="district"
            id="district"
            value={currentDistrict.code}
            onChange={ev => {
              setDistrict(regions.find(el => el.code === ev.target.value));
              setRegion({});
            }}
          >
            {regions.map(el => <MenuItem value={el.code} key={el.code}>{el.name}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl className="region" variant="outlined">
          <InputLabel id="region">Введите регион</InputLabel>
          <Select
            labelId="region"
            id="region"
            value={currentRegion.id || ''}
            onChange={ev => setRegion(currentDistrict.regions.find(el => el.id === ev.target.value))}
            disabled={!currentDistrict.code}
          >
            {currentDistrict.regions && currentDistrict.regions.map(el => (
              <MenuItem value={el.id} key={el.id}>{el.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="specialty" variant="outlined">
          <InputLabel id="specialty">Введите специальность</InputLabel>
          <Select
            labelId="specialty"
            id="specialty"
            value={currentMajor.code || ''}
            onChange={ev => setMajor(majors.find(el => el.code === ev.target.value))}
          >
            {majors.map(el => <MenuItem value={el.code} key={el.code}>{el.name}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl className="degree" variant="outlined">
          <InputLabel id="degree">Введите уч.степень</InputLabel>
          <Select
            labelId="degree"
            value={currentDegree.code || ''}
            onChange={ev => setDegree(degrees.find(el => el.code === ev.target.value))}
          >
            {degrees.map(el => <MenuItem value={el.code} key={el.code}>{el.name}</MenuItem>)}
          </Select>
        </FormControl>
        <p className="more-search">
          *Для расширенного поиска авторизируйтесь
        </p>
        <Button
          variant="contained"
          className="primary"
          disabled={!currentDistrict.code && !currentMajor.code && !currentDegree.code}
        >
          Поиск исследователей
        </Button>
      </form>
  );
};




