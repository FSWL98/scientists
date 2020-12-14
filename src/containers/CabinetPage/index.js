import React, { useState, useEffect } from 'react';
import './index.scss';
import { SideBlock } from "../../components/SideBlock";
import {ButtonsGroup} from "../../components/ButtonsGroup";
import {CabinetComponent} from "../../components/CabinetComponent";

export const CabinetPage = props => {
  return (
    <div className="main-page">
      <SideBlock page='cabinet' match={props.match} />
      <div className="main-page_right">
        <ButtonsGroup />
        <CabinetComponent edit={props.match.path.includes('/profile/edit')} match={props.match}/>
      </div>
    </div>
  );
};