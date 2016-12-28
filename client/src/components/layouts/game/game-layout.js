import React from 'react';
import { Link } from 'react-router';

import './game-layout.scss';


var PlayIcon = require('babel!svg-react!../../../../assets/img/table/svg/yoga-play.svg?name=PlayIcon');
var RealMoneyIcon = require('babel!svg-react!../../../../assets/img/table/svg/real-money-icon.svg?name=RealMoneyIcon');
var PlayMoneyIcon = require('babel!svg-react!../../../../assets/img/table/svg/play-money-icon.svg?name=PlayMoneyIcon');

// Using "Stateless Functional Components"
export default (props) => {
  return (
    <div className="container-fluid game-layout">
      <div className="row user-container">
        <div className="col-lg-5 col-sm-12">
          <div className="row">
            <div className="col-lg-3 col-sm-3">
              <Link to="/" className="play-icon-container">
                <PlayIcon />
              </Link>
            </div>
            <div className="col-lg-4 col-sm-3">
              <img className="photo"/>
            </div>
            <div className="col-lg-5 col-sm-6 user-details">
              <div className="user-name">
                Adeline Daniel
              </div>
              <div className="balance">
                Balance : $6218 
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-sm-12">
          <div className="row">
            <div className="col-lg-6 col-xs-6">
              <div className="money">
                <RealMoneyIcon /> 
                <span className="text">Real Money:</span> <span className="text value">$784</span>
              </div>
            </div>
            <div className="col-lg-6 col-xs-6">
              <div className="money">
                <PlayMoneyIcon />
                <span className="text">Play Money:</span> <span className="text value"> $784</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {props.children}
    </div>
    );
}
