import React from 'react';
import { Link } from 'react-router';

//import './loby-layout.scss';

import MoneyContainer from '../../views/money-container/money-container.jsx';
const PlayIcon = '../../../../assets/img/table/svg/yoga-play.svg';

// Using "Stateless Functional Components"
export default (props) => {
  return (
    <div className="loby-layout">
      <div className="loby-layout-header">
        <div className="left-half">
          <Link to="/" >
            <div className="play-icon-container">
              <img className="play-icon-wrapper icon-wrapper" src={PlayIcon}/>
            </div>
          </Link>
          <div className="user-detail-container">
            <div id="dp-container" className="profile-photo">
              <img id="dp" className="photo" src="http://pnge.org/wp-content/uploads/2016/12/1480662458_318_images.jpg"/>
            </div>
            <div className="name-balance-review">
              <div className="name-balance-container">
                <div className="user-name">
                  {props.userData && props.userData.name || 'Guest User'}
                </div>
                <div className="bankroll-value">
                  {`Bankroll : ${props.userData && props.userData.currentBalance || 0}`}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right-half">
          <MoneyContainer />
        </div>
      </div>
      <div>
        <div className="loby-header">
          <div className="type-name">
            <Link className="game-type-name no-decor" to="/cash-game" activeClassName="active-game-type">
              Cash games
            </Link>
            <Link className="game-type-name no-decor" to="/tournament" activeClassName="active-game-type">
              Tournament
            </Link>
          </div>
          <div className="opened-tables">
            <div className="cash-game-open">
              <Link to="/cash-game" activeClassName="active-opened" className="no-decor"> 
                <div className="opened">Opened Table (0)</div>
              </Link>
            </div>
            <div className="tournament-open">
              <Link to="/tournament" activeClassName="active-opened" className="no-decor">
                <div className="opened">Opened Tournament (0)</div>
              </Link>
            </div>
          </div>
      </div>
      </div>
      {props.children}
    </div>
    );
}
