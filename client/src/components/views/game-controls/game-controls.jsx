import React from 'react';
//import './game-controls.scss';

import AddMoneyIcon from '../../../../assets/img/game/add-money.svg';
import PauseIcon from '../../../../assets/img/game/pause.svg';
import CloseIcon from '../../../../assets/img/game/close.svg';
import ReplayIcon from '../../../../assets/img/game/reply.svg';

import Svg from '../svg/svg.jsx';

export default class GameControls extends React.Component{

  render() {
    return (
      <div className="game-controls">
        <div className="game-control-icon-container add-money-icon-container" onClick={this.props.onReplayClick}>
          <Svg className="game-control-icon-wrapper icon-wrapper" markup={ReplayIcon} />
        </div>
        <div className="game-control-icon-container add-money-icon-container">
          <Svg className="game-control-icon-wrapper icon-wrapper" markup={AddMoneyIcon} />
        </div>
        <div className="game-control-icon-container pause-icon-container">
          <Svg className="game-control-icon-wrapper icon-wrapper" markup={PauseIcon} />
        </div>
        <div className="game-control-icon-container close-icon-container" onClick={this.props.leaveTable}>
          <Svg className="game-control-icon-wrapper icon-wrapper" markup={CloseIcon} />
        </div>
      </div>
    );
  }
}
