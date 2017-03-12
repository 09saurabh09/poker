import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';

import Login from '../../views/login/login.jsx';
import MoneyContainer from '../../views/money-container/money-container.jsx';

import VideoOverlayIcon from '../../../../assets/img/home/svg/video-overlay.svg';
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
            <img src="../../../../assets/img/home/svg/yoga-play.svg" className="play-icon-wrapper icon-wrapper"/>
          </div>
          <Link className="nav-link" to="/">
            <div className="active"></div>
            <div className="home-icon">
              <img className="other-icon-wrapper icon-wrapper" src="../../../../assets/img/home/svg/home-page.svg" />
            </div>
          </Link>
          <Link to="/analytics" className="nav-link">
            <div className="analytics-icon">
              <img className="other-icon-wrapper icon-wrapper" src="../../../../assets/img/home/svg/analytics.svg" />
            </div>
          </Link>
          <Link to="/support" className="nav-link">
            <div className="support-icon">
              <img className="other-icon-wrapper icon-wrapper" src="../../../../assets/img/home/svg/support.svg" />
            </div>
          </Link>
          <Link to="/settings" className="nav-link">
            <div className="setting-icon">
              <img className="other-icon-wrapper icon-wrapper" src="../../../../assets/img/home/svg/settings.svg" />
            </div>
          </Link>
          <a className="nav-link" href="#" id="logout-link">
            <div className="logout-icon">
              <img className="other-icon-wrapper icon-wrapper" src="../../../../assets/img/home/svg/logout.svg"/>
            </div>
          </a>
        </nav>
        <section id="main">
          <div className="upper-section">
            <div className="user-detail-section">
              <div className="user-detail-container">
                <div id="dp-container" className="profile-photo">
                  <img id="dp" className="photo" src=""/>
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
                    <img className="review-icon-wrapper icon-wrapper" src="../../../../assets/img/home/svg/review-touch-point.svg"/>
                  </div>
                </div>
              </div>
              <div className="money-search-container">
                <MoneyContainer />
                <div className="search-container">
                  <div className="form-group">
                    <input type="text" className="form-control" id="search-input" placeholder="Search tournament, player, table"/>
                    <div className="search-icon">
                      <img className="search-icon-wrapper icon-wrapper" src="../../../../assets/img/home/svg/search-icon.svg"/>
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
                        <img className="game-icon-wrapper icon-wrapper" src="../../../../assets/img/home/svg/cash-games.svg"/>
                      </div>
                    </div>
                    <div className="game-text">
                      <div className="game-box">
                        <div className="game-title">
                          Cash Games
                        </div>
                        <div className="play-with-friends">
                          Freedom
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
                        <img className="game-icon-wrapper icon-wrapper" src="../../../../assets/img/home/svg/tournament.svg"/>
                      </div>
                    </div>
                    <div className="game-text">
                      <div className="game-box">
                        <div className="game-title">
                          Tournament
                        </div>
                        <div className="play-with-friends">
                          Ecstacy
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
                        <img className="game-icon-wrapper icon-wrapper" src="../../../../assets/img/home/svg/sit-and-go.svg"/>
                      </div>
                    </div>
                    <div className="game-text">
                      <div className="game-box">
                        <div className="game-title">
                          Sit and go
                        </div>
                        <div className="play-with-friends">
                          Practice
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
                        <img className="game-icon-wrapper icon-wrapper" src="../../../../assets/img/home/svg/my-tournament.svg"/>
                      </div>
                    </div>
                    <div className="game-text">
                      <div className="game-box">
                        <div className="game-title">
                          My tournament
                        </div>
                        <div className="play-with-friends">
                          Hapiness
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
