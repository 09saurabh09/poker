import React from 'react';
//import './player-chips.scss';

const CoinIcon = '../../../../assets/img/game/coin.svg';

export default class PlayerChips extends React.Component{

  render() {
    return (
      <div className={`${this.props.className} player-chips`}>
       <div className="chips">
        <div className="coin-icon-container">
          <img className="coin-icon-wrapper icon-wrapper" src={CoinIcon} />
        </div>
        <div className="chips-value">{this.props.chipsValue}</div>
       </div>
      </div>
    );
  }
}
