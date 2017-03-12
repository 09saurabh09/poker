import React from 'react';
//import './game-controls.scss';

const AddMoneyIcon = '../../../../assets/img/game/add-money.svg';
const PauseIcon = '../../../../assets/img/game/pause.svg';
const CloseIcon = '../../../../assets/img/game/close.svg';
const ReplayIcon = '../../../../assets/img/game/reply.svg';

export default class GameControls extends React.Component{

  render() {
    return (
      <div className="game-controls">
        <div className="game-control-icon-container add-money-icon-container" onClick={this.props.onReplayClick}>
          <img className="game-control-icon-wrapper icon-wrapper" src={ReplayIcon} />
        </div>
        <div className="game-control-icon-container add-money-icon-container">
          <img className="game-control-icon-wrapper icon-wrapper" src={AddMoneyIcon} />
        </div>
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
