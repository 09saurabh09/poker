import React from 'react';
import './player.scss';

export default class Player extends React.Component {

  render() {
    return (
      <div className="player">
        <div className="player-container">
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
