import React from 'react';
//import './game-controls.scss';

import AddMoneyIcon from '../../../../assets/img/game/add-money.svg';
import PauseIcon from '../../../../assets/img/game/pause.svg';
import CloseIcon from '../../../../assets/img/game/close.svg';

export default class GameControls extends React.Component{

  render() {
    return (
      <div className="game-controls">
        <div className="game-control-icon-container add-money-icon-container">
          <div className="game-control-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${AddMoneyIcon})`}}></div>
        </div>
        <div className="game-control-icon-container pause-icon-container">
          <div className="game-control-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${PauseIcon})`}}></div>
        </div>
        <div className="game-control-icon-container close-icon-container" onClick={this.props.leaveTable}>
          <div className="game-control-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${CloseIcon})`}}></div>
        </div>
      </div>
    );
  }
}
