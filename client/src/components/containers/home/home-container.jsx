import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';

import Login from '../../views/login/login';

import PlayIcon from '../../../../assets/img/home/svg/yoga-play.svg';
import HomePageIcon from '../../../../assets/img/home/svg/home-page.svg';
import AnalyticsIcon from '../../../../assets/img/home/svg/analytics.svg';
import SupportIcon from '../../../../assets/img/home/svg/support.svg';
import SettingsIcon from '../../../../assets/img/home/svg/settings.svg';
import LogoutIcon from '../../../../assets/img/home/svg/logout.svg';
import ReviewTouchPointIcon from '../../../../assets/img/home/svg/review-touch-point.svg';
var VideoOverlayIcon = require('babel!svg-react!../../../../assets/img/home/svg/video-overlay.svg?name=VideoOverlayIcon');
import RealMoneyIcon from '../../../../assets/img/home/svg/real-money-icon.svg';
import PlayMoneyIcon from '../../../../assets/img/home/svg/play-money-icon.svg';
import SearchIcon from '../../../../assets/img/home/svg/search-icon.svg';
//var CashGameIcon = require('babel!svg-react!../../../../assets/img/home/svg/cash-games.svg?name=CashGameIcon');
import cashGameIcon from '../../../../assets/img/home/svg/cash-games.svg';
//var SitGoIcon = require('babel!svg-react!../../../../assets/img/home/svg/sit-and-go.svg?name=SitGoIcon');
import SitGoIcon from '../../../../assets/img/home/svg/sit-and-go.svg';
//var TournamentIcon = require('babel!svg-react!../../../../assets/img/home/svg/tournament.svg?name=TournamentIcon');
import TournamentIcon from '../../../../assets/img/home/svg/tournament.svg';
//var MyTournamentIcon = require('babel!svg-react!../../../../assets/img/home/svg/my-tournament.svg?name=MyTournamentIcon');
import MyTournamentIcon from '../../../../assets/img/home/svg/my-tournament.svg';

import './home.scss';

import * as userApi from '../../../api/user-api';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    userApi.connectUnauthorizedSocketApi();
    userApi.connectAauthorizedSocketApi(localStorage.getItem('userToken'));
  }

  render() {
    $('document').ready(()=>{
      document.getElementById('dp').height = document.getElementById('dp').width;
    });
    return (
      <div className="home">
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
          <a className="nav-link" href="#" id="logout-link">
            <div className="logout-icon">
              <div className="other-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${LogoutIcon})`}}></div>
            </div>
          </a>
        </nav>
        <section id="main">
          <div className="upper-section">
            <div className="user-detail-section">
              <div className="user-detail-container">
                <div id="dp-container" className="profile-photo">
                  <img id="dp" className="photo" src="http://pnge.org/wp-content/uploads/2016/12/1480662458_318_images.jpg"/>
                </div>
                <div className="name-balance-review">
                  <div className="name-balance-container">
                    <div className="user-name">
                      Adeline Daniel
                    </div>
                    <div className="balance">
                      Balance : $6218 
                    </div>
                  </div>
                  <div className="review-icon-container">
                    <div className="review-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${ReviewTouchPointIcon})`}}></div>
                  </div>
                </div>
              </div>
              <div className="money-search-container">
                <div className="money-container">
                  <div className="money">
                    <div className="money-icon-container">
                      <div className="money-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${RealMoneyIcon})`}}></div>
                    </div>
                    <span className="text">On Table:</span> <span className="text value">$784</span>
                  </div>
                  <div className="money">
                    <div className="money-icon-container">
                      <div className="money-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${PlayMoneyIcon})`}}></div>
                    </div>
                    <span className="text">Off Table:</span> <span className="text value"> $784</span>
                  </div>
                </div>
                <div className="search-container">
                  <div className="form-group">
                    <input type="text" className="form-control" id="search-input" placeholder="Search tournament, player, table"/>
                    <div className="search-icon">
                      <div className="search-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${SearchIcon})`}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="video-section">
              Hello
            </div>  
          </div>
          <div className="lower-section">
            <div className="width-100">
              <div className="width-50">
                <Link to="/cash-game" className="cash-game">
                  <div className="game">
                    <div className="game-icon">
                      <div className="cash-game-icon-container game-icon-container">
                        <div className="game-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${cashGameIcon})`}}></div>
                      </div>
                    </div>
                    <div className="game-text">
                      <div className="game-box">
                        <div className="game-title">
                          Cash Games
                        </div>
                        <div className="play-with-friends">
                          Play with your friends
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="width-50">
                <Link to="/tournament" className="cash-game">
                  <div className="game">
                    <div className="game-icon">
                      <div className="game-icon-container tournament-icon-container">
                        <div className="game-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${TournamentIcon})`}}></div>
                      </div>
                    </div>
                    <div className="game-text">
                      <div className="game-box">
                        <div className="game-title">
                          Tournament
                        </div>
                        <div className="play-with-friends">
                          Play with your friends
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="width-100">
              <div className="width-50">
                <Link to="/cash-game" className="cash-game">
                  <div className="game">
                    <div className="game-icon">
                      <div className="game-icon-container sit-game-icon-container">
                        <div className="game-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${SitGoIcon})`}}></div>
                      </div>
                    </div>
                    <div className="game-text">
                      <div className="game-box">
                        <div className="game-title">
                          Sit and go
                        </div>
                        <div className="play-with-friends">
                          Play with your friends
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="width-50">
                <Link to="/cash-game" className="cash-game">
                  <div className="game">
                    <div className="game-icon">
                      <div className="game-icon-container mytourn-game-icon-container">
                        <div className="game-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${MyTournamentIcon})`}}></div>
                      </div>
                    </div>
                    <div className="game-text">
                      <div className="game-box">
                        <div className="game-title">
                          My tournament
                        </div>
                        <div className="play-with-friends">
                          Play with your friends
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Login />
      </div>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    socket: store.socket,
    userData: store.userData,
    runningGames : store.gameState.runningGames,
    gameData: store.gameState.gameData
  };
};

export default connect(mapStateToProps)(Home);
