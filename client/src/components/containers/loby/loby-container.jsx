import React from 'react';
import { Link } from 'react-router';

import Login from '../../views/login/login';

import PlayIcon from '../../../../assets/img/loby/svg/yoga-play.svg';
import HomePageIcon from '../../../../assets/img/loby/svg/home-page.svg';
import AnalyticsIcon from '../../../../assets/img/loby/svg/analytics.svg';
import SupportIcon from '../../../../assets/img/loby/svg/support.svg';
import SettingsIcon from '../../../../assets/img/loby/svg/settings.svg';
import LogoutIcon from '../../../../assets/img/loby/svg/logout.svg';
var ReviewTouchPointIcon = require('babel!svg-react!../../../../assets/img/loby/svg/review-touch-point.svg?name=ReviewTouchPointIcon');
var VideoOverlayIcon = require('babel!svg-react!../../../../assets/img/loby/svg/video-overlay.svg?name=VideoOverlayIcon');
var RealMoneyIcon = require('babel!svg-react!../../../../assets/img/loby/svg/real-money-icon.svg?name=RealMoneyIcon');
var PlayMoneyIcon = require('babel!svg-react!../../../../assets/img/loby/svg/play-money-icon.svg?name=PlayMoneyIcon');
var SearchIcon = require('babel!svg-react!../../../../assets/img/loby/svg/search-icon.svg?name=SearchIcon');
//var CashGameIcon = require('babel!svg-react!../../../../assets/img/loby/svg/cash-games.svg?name=CashGameIcon');
import cashGameIcon from '../../../../assets/img/loby/svg/cash-games.svg';
//var SitGoIcon = require('babel!svg-react!../../../../assets/img/loby/svg/sit-and-go.svg?name=SitGoIcon');
import SitGoIcon from '../../../../assets/img/loby/svg/sit-and-go.svg';
//var TournamentIcon = require('babel!svg-react!../../../../assets/img/loby/svg/tournament.svg?name=TournamentIcon');
import TournamentIcon from '../../../../assets/img/loby/svg/tournament.svg';
//var MyTournamentIcon = require('babel!svg-react!../../../../assets/img/loby/svg/my-tournament.svg?name=MyTournamentIcon');
import MyTournamentIcon from '../../../../assets/img/loby/svg/my-tournament.svg';

import './loby.scss';

export default class Loby extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    setTimeout(()=>{
      document.getElementById('dp').height = document.getElementById('dp').width;
    }, 1000);
    return (
      <div className="loby">
        <nav role="main">
          <div className="play-icon nav-link">
            <div className="play-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${PlayIcon})`}}></div>
          </div>
          <Link className="nav-link" to="/">
            <div className="active"></div>
            <div className="home-icon">
              <div className="other-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${HomePageIcon})`}}></div>
            </div>
          </Link>
          <Link to="/analytics" className="nav-link">
            <div className="analytics-icon">
              <div className="other-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${AnalyticsIcon})`}}></div>
            </div>
          </Link>
          <Link to="/support" className="nav-link">
            <div className="support-icon">
              <div className="other-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${SupportIcon})`}}></div>
            </div>
          </Link>
          <Link to="/settings" className="nav-link">
            <div className="setting-icon">
              <div className="other-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${SettingsIcon})`}}></div>
            </div>
          </Link>
          <a className="nav-link" href="#">
            <div className="logout-icon">
              <div className="other-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${LogoutIcon})`}}></div>
            </div>
          </a>
        </nav>
        <section id="main">
          <div className="user-detail-section">
            <div id="dp-container" className="profile-photo">
              <img id="dp" className="photo" src="http://pnge.org/wp-content/uploads/2016/12/1480662458_318_images.jpg"/>
            </div>
            <div className="name-balance-review">
            </div>
          </div>
          <div className="video-section">
            Hello
          </div>
        </section>
      </div>
    )
  }
}