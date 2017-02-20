import React from 'react';

import Card from '../card/card.jsx'

if(process.env.WEBPACK) {
  require( './player-cards.scss' );
}
export default class PlayerCards extends React.Component{

  render() {
    return (
      <div className="player-cards">
        {this.props.cards && this.props.cards.map((element, index)=> 
          <div key={index} className="player-cards-container" style={{left: index*15 + 'px'}}>
            <Card card={element}/>
          </div>
          )}
      </div>
    );
  }
}
