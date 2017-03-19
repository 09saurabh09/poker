import React from 'react';
//import './game-controls.scss';
const CloseIcon = '../../../../assets/img/game/close.svg';
const PauseIcon = '../../../../assets/img/game/pause.svg';

export default class GameControls extends React.Component{

  render() {
    return (
      <div className="game-controls">
        <div className="game-control-icon-container pause-icon-container">
          <img className="game-control-icon-wrapper icon-wrapper" src={PauseIcon} />
        </div>
        <div className="game-control-icon-container close-icon-container" onClick={this.props.leaveTable}>
          <img className="game-control-icon-wrapper icon-wrapper" src={CloseIcon} />
        </div>
      </div>
    );
  }
}
