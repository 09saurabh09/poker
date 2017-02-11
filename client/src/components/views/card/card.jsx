import React from 'react';
import './card.scss';

export default class PlayerCards extends React.Component{

  render() {
    return (
      <div className={'card rank ' + this.props.card.suit}>
        <span className="rank">{this.props.card.value}</span>
        <span className="suit"></span>
      </div>
    );
  }
}
