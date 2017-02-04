import React from 'react';
import './player-chips.scss';

export default class PlayerChips extends React.Component{

  render() {
    return (
      <div className="player-chips">
       <div className="chips">R <span className="chips-value">{this.props.chipsValue}</span></div>
       
      </div>
    );
  }
}
