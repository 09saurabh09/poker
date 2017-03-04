import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';

import Login from '../../views/login/login.jsx';

import PlayIcon from '../../../../assets/img/home/svg/yoga-play.svg';
import HomePageIcon from '../../../../assets/img/home/svg/home-page.svg';
import AnalyticsIcon from '../../../../assets/img/home/svg/analytics.svg';
import SupportIcon from '../../../../assets/img/home/svg/support.svg';
import SettingsIcon from '../../../../assets/img/home/svg/settings.svg';
import LogoutIcon from '../../../../assets/img/home/svg/logout.svg';
import ReviewTouchPointIcon from '../../../../assets/img/home/svg/review-touch-point.svg';
import VideoOverlayIcon from '../../../../assets/img/home/svg/video-overlay.svg';
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

import Svg from '../../views/svg/svg.jsx';
/*import './home.scss';*/

import * as userApi from '../../../api/user-api';
import { connectUnauthorizedSocket, connectAuthorizedSocket } from '../../../actions/socket-actions';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('document').ready(()=>{
      document.getElementById('dp').height = document.getElementById('dp').width;
        // Get the button that opens the modal
      var btn = document.getElementById('logout-link');

      // When the user clicks the button, open the modal 
      btn.onclick = function() {
        var modal = document.getElementById('login');
        modal.style.display = 'block';
      }
    });
    this.props.dispatch(connectUnauthorizedSocket());
    this.props.dispatch(connectAuthorizedSocket(localStorage.getItem('userToken')));
  }

  render() {
    return (
      <div className="home">
        <nav role="main">
          <div className="play-icon nav-link">
            <Svg markup={PlayIcon} className="play-icon-wrapper icon-wrapper"/>
          </div>
          <Link className="nav-link" to="/">
            <div className="active"></div>
            <div className="home-icon">
              <Svg className="other-icon-wrapper icon-wrapper" markup={HomePageIcon} />
            </div>
          </Link>
          <Link to="/analytics" className="nav-link">
            <div className="analytics-icon">
              <Svg className="other-icon-wrapper icon-wrapper" markup={AnalyticsIcon} />
            </div>
          </Link>
          <Link to="/support" className="nav-link">
            <div className="support-icon">
              <Svg className="other-icon-wrapper icon-wrapper" markup={SupportIcon} />
            </div>
          </Link>
          <Link to="/settings" className="nav-link">
            <div className="setting-icon">
              <Svg className="other-icon-wrapper icon-wrapper" markup={SettingsIcon} />
            </div>
          </Link>
          <a className="nav-link" href="#" id="logout-link">
            <div className="logout-icon">
              <Svg className="other-icon-wrapper icon-wrapper" markup={LogoutIcon} />
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
                      {this.props.userData && this.props.userData.name || 'Guest User'}
                    </div>
                    <div className="balance">
                      {`Balance : ${this.props.userData && this.props.userData.currentBalance || 0}`}
                    </div>
                  </div>
                  <div className="review-icon-container">
                    <Svg className="review-icon-wrapper icon-wrapper" markup={ReviewTouchPointIcon} />
                  </div>
                </div>
              </div>
              <div className="money-search-container">
                <div className="money-container">
                  <div className="money">
                    <div className="money-icon-container">
                      <Svg className="money-icon-wrapper icon-wrapper" markup={RealMoneyIcon} />
                    </div>
                    <span className="text">On Table:</span> <span className="text value">$784</span>
                  </div>
                  <div className="money">
                    <div className="money-icon-container">
                      <Svg className="money-icon-wrapper icon-wrapper" markup={PlayMoneyIcon} />
                    </div>
                    <span className="text">Off Table:</span> <span className="text value"> $784</span>
                  </div>
                </div>
                <div className="search-container">
                  <div className="form-group">
                    <input type="text" className="form-control" id="search-input" placeholder="Search tournament, player, table"/>
                    <div className="search-icon">
                      <Svg className="search-icon-wrapper icon-wrapper" markup={SearchIcon} />
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
                        <Svg className="game-icon-wrapper icon-wrapper" markup={cashGameIcon} />
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
                        <Svg className="game-icon-wrapper icon-wrapper" markup={TournamentIcon} />
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
                        <Svg className="game-icon-wrapper icon-wrapper" markup={SitGoIcon} />
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
                        <Svg className="game-icon-wrapper icon-wrapper" markup={MyTournamentIcon} />
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
        <Login postLogin={()=>{}} dispatch={this.props.dispatch}/>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    socket: state.socket,
    userData: state.userState.userData,
    gameData: state.gameState.gameData
  };
};

export default connect(mapStateToProps)(Home);
