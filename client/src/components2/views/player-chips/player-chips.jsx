import React from 'react';

if(process.env.WEBPACK) {
  require ('./player-chips.scss');
  var CoinIcon = require( '../../../../assets/img/game/coin.svg' );
}
export default class PlayerChips extends React.Component{

  render() {
    return (
      <div className="player-chips">
       <div className="chips">
        <div className="coin-icon-container">
          <div className="coin-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${CoinIcon})`}}></div>
        </div>
        <div className="chips-value">{this.props.chipsValue}</div>
       </div>
      </div>
    );
  }
}
