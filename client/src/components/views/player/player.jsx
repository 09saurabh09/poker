import React from 'react';
import './player.scss';

import BasicUserCard from '../../../../assets/img/game/basic-user-card.svg';
import PlayerCards from '../player-cards/player-cards';

export default class Player extends React.Component {

  render() {
    let activeClassName = this.props.player.active? 'active' : '';
    return (
      <div className="player">
        <div className="player-card-wrapper">
          <PlayerCards cards={[{suit: "diams", value: "A"},{suit: "diams", value: "Q"},{suit: "diams", value: 3},{suit: "diams", value: 2}]}/>
        </div>
        <div className={"player-container " + activeClassName}>
          <div className="player-wrapper">
            <div className="player-dp">
              <img src="" />
            </div>
            <div className="player-name">Amar Nath Saha</div>
            <div className="player-color-container">
              <div className="color-dot">
                
              </div>
            </div>
            <div className="player-money">
              <div className="player-balance">
                $1234
              </div>
              <div className="player-bb">
                BB <span className="bb-value"> 26 </span>
              </div>
            </div>
            <div>
              
            </div>
            <div className="player-game-style">
              <div className="hands-played"></div>
              <div className="raised"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
