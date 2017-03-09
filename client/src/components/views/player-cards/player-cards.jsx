import React from 'react';
//import './player-cards.scss';

import Card from '../card/card.jsx'
import Svg from '../svg/svg.jsx'
import ColourfulCardIcon from '../../../../assets/img/game/colourful.svg';

export default class PlayerCards extends React.Component{

  render() {
    return (
      <div className="player-cards">
        {this.props.cards ? this.props.cards.map((element, index)=> 
          <div key={index} className="player-cards-container" style={{left: index*15 + 'px'}}>
            <Card card={element}/>
          </div>
          ) : 
        <div className="card-back-container">
          <Svg className="card-back-wrapper icon-wrapper" markup={ColourfulCardIcon} />
        </div>
      }
      </div>
    );
  }
}
