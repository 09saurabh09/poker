import React from 'react';
//import './card.scss';
//import Black10 from ;
import Svg from '../svg/svg.jsx';
export default class PlayerCards extends React.Component{

  render() {
  	let rank = this.props.card[0], suit;
  	if(rank == 'T') {
  		rank = 10;
  	}
    switch(this.props.card[1]) {
      case 'h': suit = 'heart-card'; break;
      case 's': suit = 'green'; break;
      case 'c': suit = 'black'; break;
      case 'd': suit = 'blue'; break;
      default: suit = black; break;
    }
    let url = `../../../../assets/img/cards/svg/${suit}-${rank.toString().toLowerCase()}.svg`;
    return (
      <div className={'card rank ' + suit}>
        <img src={url} className="card-icon-wrapper icon-wrapper"/>
      </div>
    );
  }
}
