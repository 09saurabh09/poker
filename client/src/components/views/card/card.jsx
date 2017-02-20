import React from 'react';
import './card.scss';

export default class PlayerCards extends React.Component{

  render() {
    return (
      <div className={'card rank ' + this.props.card[0]}>
        <span className="rank">{this.props.card[1]}</span>
        <span className="suit"></span>
        <div className="big-suit suit"></div>
      </div>
    );
  }
}
