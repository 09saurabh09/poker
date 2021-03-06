import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';
import utils from '../../../utils/utils';
import Login from '../../views/login/login.jsx';
import TableSettings from '../../views/table-settings/table-settings.jsx';
import MoneyContainer from '../../views/money-container/money-container.jsx';

const VideoOverlayIcon = '../../../../assets/img/home/svg/video-overlay.svg';
/*import './home.scss';*/

import * as userApi from '../../../api/user-api';
import { connectUnauthorizedSocket, connectAuthorizedSocket } from '../../../actions/socket-actions';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('document').ready(()=>{
      //document.getElementById('dp').height = document.getElementById('dp').width;
      $('#dp-container').height($('#dp-container').width());
        // Get the button that opens the modal
      let aspectRatio = ($('#main').width())/($('#main').height());
      $(window).resize(function() {
        $('#dp-container').height($('#dp-container').width());
        let currentRatio = $('#root').width() / 720;
        let fontSize = 14 * currentRatio;
        if(fontSize < 14) {
          fontSize = 14;
        }
        $('body').css({ 'font-size': `${fontSize}px` });
      }).resize();
    });
    this.props.dispatch(connectUnauthorizedSocket());
    this.props.dispatch(connectAuthorizedSocket(localStorage.getItem('userToken')));
  }

  openLogin() {
    utils.openModal('login'); 
    $('.sign-up-form').animate({height:0, opacity: 0}, 0);
    $('.sign-up-form').css('visibility', 'hidden');
    $('#login .form-group').removeClass('sign-up-form-group');
    $('#login .play-icon-container').removeClass('sign-up-form-group');
    $('.forget-password').show();
    $('.bottom-button-container').show();
  }

  render() {
    return (
      <div className="home">
        <nav role="main">
          <div className="play-icon nav-link">
            <img src="../../../../assets/img/home/svg/logo-only.svg" className="play-icon-wrapper icon-wrapper"/>
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
          <Link to="/" className="nav-link" onClick={utils.openModal.bind(this, 'table-settings')}>
            <div className="setting-icon">
              <img className="other-icon-wrapper icon-wrapper" src="../../../../assets/img/home/svg/settings.svg" />
            </div>
          </Link>
          <Link className="nav-link" to="/" id="logout-link" onClick={this.openLogin.bind(this)}>
            <div className="logout-icon">
              <img className="other-icon-wrapper icon-wrapper" src="../../../../assets/img/home/svg/logout.svg"/>
            </div>
          </Link>
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
                      {this.props.userData && this.props.userData.userName || 'Guest User'}
                    </div>
                    <div className="balance">
                      <div className="money-balance">
                        <div className="balance-value">
                          0
                        </div>
                        <div className="balance-type">
                          WALLET
                        </div>
                      </div>
                      <div className="money-balance bankroll-money-balance">
                        <div className="balance-value bankroll-balance-value">
                          {this.props.userData && this.props.userData.currentBalance || 0}
                        </div>
                        <div className="balance-type">
                          BANKROLL
                        </div>
                      </div>
                      <div className="money-balance">
                        <div className="balance-value">
                          0
                        </div>
                        <div className="balance-type">
                          KARMA
                        </div>
                      </div>
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
              <div className="promotions-icon-container game-icon-container">
                  <img className="promotions-wrapper icon-wrapper" src="../../../../assets/img/home/svg/promotion.svg"/>
                </div>
            </div>  
          </div>
          <div className="lower-section">
            <div className="col-lg-12 lower-top">
              <div className="width-49">
                <Link to="/cash-game" className="game-section">
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
              <div className="width-49">
                <Link to="/tournament" className="game-section">
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
            <div className="col-lg-12 lower-bottom">
              <div className="width-49">
                <Link to="/cash-game" className="game-section">
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
              <div className="width-49">
                <Link to="/cash-game" className="game-section">
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
        <TableSettings onSet={()=>{}} userData={this.props.userData} dispatch={this.props.dispatch}/>
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
