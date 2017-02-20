import React from 'react';
if(process.env.WEBPACK) {
  require( './game-controls.scss' );
  var AddMoneyIcon = require( '../../../../assets/img/game/add-money.svg' );
  var PauseIcon = require( '../../../../assets/img/game/pause.svg' );
  var CloseIcon = require( '../../../../assets/img/game/close.svg' );
}
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
        <div className="game-control-icon-container close-icon-container">
          <div className="game-control-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${CloseIcon})`}}></div>
        </div>
      </div>
    );
  }
}
