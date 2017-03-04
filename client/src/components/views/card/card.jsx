import React from 'react';
//import './card.scss';

export default class PlayerCards extends React.Component{

  render() {
  	let rank = this.props.card[0];
  	if(rank == 'T') {
  		rank = 10;
  	}
    return (
      <div className={'card rank ' + this.props.card[1]}>
        <span className="rank">{rank}</span>
        <span className="suit"></span>
        <div className="big-suit suit"></div>
      </div>
    );
  }
}
