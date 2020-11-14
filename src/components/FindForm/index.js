import React, { useState } from 'react';
import './index.scss';
import logo from '../../assets/Logo.svg';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { regions } from './consts';


export const FindForm = () => {
  const [currentDistrict, setDistrict] = useState({});
  const [currentRegion, setRegion] = useState({});

  return (
      <form className="find-form">
        <FormControl className="district" variant="outlined">
          <InputLabel id="district">Введите округ</InputLabel>
          <Select
            labelId="district"
            id="district"
            value={currentDistrict.name}
            onChange={ev => {
              setDistrict(regions.find(el => el.name === ev.target.value));
              setRegion({});
            }}
          >
            {regions.map(el => <MenuItem value={el.name}>{el.name}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl className="region" variant="outlined">
          <InputLabel id="region">Введите регион</InputLabel>
          <Select
            labelId="region"
            id="region"
            value={currentRegion.id || ''}
            onChange={ev => setRegion(currentDistrict.regions.find(el => el.id === ev.target.value))}
          >
            {currentDistrict.regions && currentDistrict.regions.map(el => (
              <MenuItem value={el.id}>{el.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="specialty" variant="outlined">
          <InputLabel id="specialty">Введите специальность</InputLabel>
          <Select
            labelId="specialty"
            id="specialty"
          >
            <MenuItem value={10}>Решала</MenuItem>
            <MenuItem value={20}>Босс</MenuItem>
            <MenuItem value={30}>шестерка</MenuItem>
          </Select>
        </FormControl>
        <FormControl className="degree" variant="outlined">
          <InputLabel id="degree">Введите уч.степень</InputLabel>
          <Select
            labelId="degree"
            id="degree"
          >
            <MenuItem value={10}>Майнд босс</MenuItem>
            <MenuItem value={20}>Пень</MenuItem>
            <MenuItem value={30}>Ни рыба, ни мясо</MenuItem>
          </Select>
        </FormControl>
        <p className="more-search">
          *Для расширенного поиска авторизируйтесь
        </p>
        <Button variant="contained" className="primary">Поиск исследователей</Button>
      </form>
  );
};




