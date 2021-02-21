import React, { useState } from 'react';
import './index.scss';
import logo from '../../assets/logo.svg';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { regions, degrees, majors } from './consts';
import TextField from "@material-ui/core/TextField";


export const FindForm = props => {
  return (
      <form className="find-form">
        <FormControl className="district" variant="outlined">
          <InputLabel id="district">Введите округ</InputLabel>
          <Select
            labelId="district"
            id="district"
            value={props.currentDistrict.code || 'none'}
            onChange={ev => {
              props.setDistrict(ev.target.value === 'none' ? {} : regions.find(el => el.code === ev.target.value));
              props.setRegion({});
            }}
          >
            <MenuItem value="none">Не важно</MenuItem>
            {regions.map(el => <MenuItem value={el.code} key={el.code}>{el.name}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl className="region" variant="outlined">
          <InputLabel id="region">Введите регион</InputLabel>
          <Select
            labelId="region"
            id="region"
            value={props.currentRegion.id || 'none'}
            onChange={ev => props.setRegion(ev.target.value === 'none' ? {} : props.currentDistrict.regions.find(el => el.id === ev.target.value))}
            disabled={!props.currentDistrict.code}
          >
            <MenuItem value="none">Не важно</MenuItem>
            {props.currentDistrict.regions && props.currentDistrict.regions.map(el => (
              <MenuItem value={el.id} key={el.id}>{el.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="specialty" variant="outlined">
          <InputLabel id="specialty">Введите специальность</InputLabel>
          <Select
            labelId="specialty"
            id="specialty"
            value={props.currentMajor.code || 'none'}
            onChange={ev => props.setMajor(ev.target.value === 'none' ? {} : majors.find(el => el.code === ev.target.value))}
          >
            <MenuItem value="none">Не важно</MenuItem>
            {majors.map(el => <MenuItem value={el.code} key={el.code}>{el.name}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl className="degree" variant="outlined">
          <InputLabel id="degree">Введите уч.степень</InputLabel>
          <Select
            labelId="degree"
            value={props.currentDegree.code || 'none'}
            onChange={ev => props.setDegree(ev.target.value === 'none' ? {} : degrees.find(el => el.code === ev.target.value))}
          >
            <MenuItem value="none">Не важно</MenuItem>
            {degrees.map(el => <MenuItem value={el.code} key={el.code}>{el.name}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField
          label="Ключевые слова (через пробел)"
          value={props.keyWords}
          onChange={ev => props.setKeyWords(ev.target.value)}
          variant="outlined"
        />
        <Button
          variant="contained"
          className="primary"
          onClick={() => props.handleSubmit()}
          disabled={props.isLoading}
        >
          {props.isLoading ? 'Идет поиск...' : 'Поиск исследователей'}
        </Button>
      </form>
  );
};




