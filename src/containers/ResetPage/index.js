import React, {useEffect, useState} from 'react';
import '../MainPage/index.scss';
import { ButtonsGroup } from "../../components/ButtonsGroup";
import { NewsBlock } from "../../components/NewsBlock";
import {SideBlock} from "../../components/SideBlock";
import YandexMap from "../../components/YandexMap";
import {YMaps} from "react-yandex-maps";
import scientistsService from "../../services/scientistsService";
import Dialog from "@material-ui/core/Dialog";
import { useHistory } from 'react-router-dom';
import close from "../../assets/Close.svg";
import logo from "../../assets/pablita-finance 1.png";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export const ResetPage = props => {
  const [currentDistrict, setDistrict] = useState({});
  const [currentRegion, setRegion] = useState({});
  const [currentDegree, setDegree] = useState({});
  const [currentMajor, setMajor] = useState({});
  const [keyWords, setKeyWords] = useState('');
  const [points, setPoints] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    show: true,
    password: '',
    repeatPassword: '',
    error: false
  });
  const history = useHistory();

  const handleChange = (value, field) => {
    setModal({
      ...modal,
      [field]: value
    })
  };

  // хук жизненного цикла, срабатывающий при маунте компонента
  useEffect(() => {
    getPoints();
  }, []);

  // функция получения точек для карты
  const getPoints = () => {
    setLoading(true);
    scientistsService.getPoints(currentDistrict.code, currentRegion.name, currentMajor.name, currentDegree.name, keyWords.split(' ').join(';'))
      .then(response => {
        setPoints(response);
        setLoading(false);
      });
  };

  const resetPassword = ev => {
    ev.preventDefault();
    if (modal.password !== modal.repeatPassword) {
      setModal({
        ...modal,
        error: true
      });
      return;
    }
    scientistsService.setNewPassword(modal.password, props.location.search.split('=')[1])
      .then(response => console.log(response));
  };

  return (
    <div className="main-page">
      <Dialog open={modal.show} onClose={() => history.push('/main')} className="login-dialog">
        <button onClick={() => history.push('/main')} className="close">
          <img src={close} alt="Закрыть" />
        </button>
        <img src={logo} alt="picture" className="picture"/>
        <h3>Сброс пароля</h3>
        <form>
          <TextField
            value={modal.password}
            label="Новый пароль"
            variant="outlined"
            onChange={ev => handleChange(ev.target.value, 'password')}
            type="password"
            required
          />
          <TextField
            value={modal.repeatPassword}
            label="Повторите пароль"
            variant="outlined"
            onChange={ev => handleChange(ev.target.value, 'repeatPassword')}
            type="password"
            error={modal.error}
            helperText={modal.error ? "Пароли не совпадают" : ""}
            required
          />
          <Button
            type="submit"
            variant="contained"
            className="primary"
          >
            Сбросить пароль
          </Button>
        </form>
      </Dialog>
      <SideBlock
        page="main"
        match={props.match}
        currentDistrict={currentDistrict}
        setDistrict={setDistrict}
        currentRegion={currentRegion}
        setRegion={setRegion}
        currentDegree={currentDegree}
        setDegree={setDegree}
        currentMajor={currentMajor}
        setMajor={setMajor}
        keyWords={keyWords}
        setKeyWords={setKeyWords}
        handleSubmit={getPoints}
        isLoading={isLoading}
      />
      <div className="main-page_right">
        <ButtonsGroup />
        <YMaps query={{
          apikey: '057905fb-544c-4be6-a25e-41f05ae9aeb5',
        }}>
          <YandexMap points={points}/>
        </YMaps>
        <NewsBlock />
      </div>
    </div>
  );
};