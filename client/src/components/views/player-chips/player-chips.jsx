import React from 'react';
//import './player-chips.scss';

import CoinIcon from '../../../../assets/img/game/coin.svg';
import Svg from '../svg/svg.jsx';

export default class PlayerChips extends React.Component{

  render() {
    return (
      <div className="player-chips">
       <div className="chips">
        <div className="coin-icon-container">
          <Svg className="coin-icon-wrapper icon-wrapper" markup={CoinIcon} />
        </div>
        <div className="chips-value">{this.props.chipsValue}</div>
       </div>
      </div>
    );
  }
}
