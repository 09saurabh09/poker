import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';
import utils from '../../../utils/utils';
import Login from '../../views/login/login.jsx';
import TableSettings from '../../views/table-settings/table-settings.jsx';
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
      //document.getElementById('dp').height = document.getElementById('dp').width;
      $('#dp-container').height($('#dp-container').width());
        // Get the button that opens the modal
      let aspectRatio = ($('#main').width())/($('#main').height());
      $(window).resize(function() {
        $('#dp-container').height($('#dp-container').width());
        $('#main').width(aspectRatio * $('#main').height());
        /*if($('.main-table').height() <= ($(window).height() * .60) || $('.main-table').width() >= $(window).width() * .75 ){
          $('.main-table').width( $(window).width() * .70 );
          $('.main-table').height( $('.main-table').width() * 0.45 );
        } else {
          $('.main-table').height( $(window).height() * .65);
          $('.main-table').width( $('.main-table').height() * 2.22 );
        }*/
      }).resize();
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
          <Link to="/" className="nav-link" onClick={utils.openModal.bind(this, 'table-settings')}>
            <div className="setting-icon">
              <img className="other-icon-wrapper icon-wrapper" src="../../../../assets/img/home/svg/settings.svg" />
            </div>
          </Link>
          <Link className="nav-link" to="/" id="logout-link" onClick={utils.openModal.bind(this, 'login')}>
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
