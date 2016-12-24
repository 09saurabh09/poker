import React from 'react';
import { Link } from 'react-router';

var PlayIcon = require('babel!svg-react!../../../../assets/img/loby/svg/yoga-play.svg?name=PlayIcon');
var HomePageIcon = require('babel!svg-react!../../../../assets/img/loby/svg/home-page.svg?name=HomePageIcon');
var AnalyticsIcon = require('babel!svg-react!../../../../assets/img/loby/svg/analytics.svg?name=AnalyticsIcon');
var SupportIcon = require('babel!svg-react!../../../../assets/img/loby/svg/support.svg?name=SupportIcon');
var SettingsIcon = require('babel!svg-react!../../../../assets/img/loby/svg/settings.svg?name=SettingsIcon');
var LogoutIcon = require('babel!svg-react!../../../../assets/img/loby/svg/logout.svg?name=LogoutIcon');
var ReviewTouchPointIcon = require('babel!svg-react!../../../../assets/img/loby/svg/review-touch-point.svg?name=ReviewTouchPointIcon');
var VideoOverlayIcon = require('babel!svg-react!../../../../assets/img/loby/svg/video-overlay.svg?name=VideoOverlayIcon');
var RealMoneyIcon = require('babel!svg-react!../../../../assets/img/loby/svg/real-money-icon.svg?name=RealMoneyIcon');
var PlayMoneyIcon = require('babel!svg-react!../../../../assets/img/loby/svg/play-money-icon.svg?name=PlayMoneyIcon');
var SearchIcon = require('babel!svg-react!../../../../assets/img/loby/svg/search-icon.svg?name=SearchIcon');
var CashGameIcon = require('babel!svg-react!../../../../assets/img/loby/svg/cash-games.svg?name=CashGameIcon');
var SitGoIcon = require('babel!svg-react!../../../../assets/img/loby/svg/sit-and-go.svg?name=SitGoIcon');
var TournamentIcon = require('babel!svg-react!../../../../assets/img/loby/svg/tournament.svg?name=TournamentIcon');
var MyTournamentIcon = require('babel!svg-react!../../../../assets/img/loby/svg/my-tournament.svg?name=MyTournamentIcon');

import './loby.scss';

export default class Loby extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ui grid">
        <aside className="two wide column">
          <div className="icon-bar">
              <div className="play-icon">
                <PlayIcon />
              </div>
              <Link className="home-icone-wrapper" to="/">
                <div className="active"></div>
                <div className="home-icon">
                  <HomePageIcon />
                </div>
              </Link>
              <Link to="/analytics">
                <AnalyticsIcon />
              </Link>
              <Link to="/support">
                <SupportIcon />
              </Link>
              <Link to="/settings">
                <SettingsIcon />
              </Link>
              <Link to="/logout" className="logout-container">
                <LogoutIcon />
              </Link>
          </div>
        </aside>
        <main className="fourteen wide column">
          <div className="ui grid">
            <div className="eight wide column">
              <div className="ui grid user-details">
                <div className="five wide column profile-photo">
                  <img className="photo"/>
                </div>
                <div className="eleven wide column">
                  <div className="ui grid user-details">
                    <div className="nine wide column">
                      <div className="user">
                        <div className="user-name">
                          Adeline Daniel
                        </div>
                        <div className="balance">
                          Balance : $6218 
                        </div>
                      </div>
                    </div>
                    <div className="seven wide column">
                      <div className="review-icon">
                        <ReviewTouchPointIcon/>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
              <div className="ui grid money-search-container">
                <div className="ui grid stackable">
                  <div className="eight wide column">
                    <div className="money">
                      <RealMoneyIcon /> 
                      <span className="text">Real Money:</span> <span className="text value">$784</span>
                    </div>
                  </div>
                  <div className="eight wide column">
                    <div className="money">
                      <PlayMoneyIcon />
                      <span className="text">Play Money:</span> <span className="text value"> $784</span>
                    </div>
                  </div>
                </div>
                <div className="search-container">
                  <div className="ui input">
                    <input type="text" id="search-input" placeholder="Search tournament, player, table"/>
                    <div className="search-icon">
                      <SearchIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="eight wide column review-section">
              <div className="video-container">
                <video className="promo-video"></video>
                <div className="video-overlay">
                  <VideoOverlayIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="game-types">
            <div className="ui grid">
            <div className="eight wide column">
              <Link to="/game/cash-games" className="ui grid game cash-game">
                <div className="seven wide column">
                  <div className="cash-game-icon-container">
                    <CashGameIcon />
                  </div>
                </div>
                <div className="nine wide column">
                  <div className="game-box">
                    <div className="game-title">
                      Cash Games
                    </div>
                    <div className="play-with-friends">
                      Play with your friends
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/game/sit-and-go"  className="ui grid game sit-and-go">
                <div className="seven wide column">
                  <div className="sit-go-game-icon-container">
                    <SitGoIcon />
                  </div>
                </div>
                <div className="nine wide column">
                  <div className="game-box">
                    <div className="game-title">
                      Sit and Go
                    </div>
                    <div className="play-with-friends">
                      Play with your friends
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="eight wide column">
              <Link to="/game/tournament" className="ui grid game tournament">
                <div className="seven wide column">
                  <div className="tournament-icon-container">
                    <TournamentIcon />
                  </div>
                </div>
                <div className="nine wide column">
                  <div className="game-box">
                    <div className="game-title">
                      Tournament
                    </div>
                    <div className="play-with-friends">
                      Play with your friends
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/game/my-tournament" className="ui grid game my-tournamet">
                <div className="seven wide column">
                  <div className="my-tournament-icon-container">
                    <MyTournamentIcon />
                  </div>
                </div>
                <div className="nine wide column">
                  <div className="game-box">
                    <div className="game-title">
                      My Tournament
                    </div>
                    <div className="play-with-friends">
                      Play with your friends
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}