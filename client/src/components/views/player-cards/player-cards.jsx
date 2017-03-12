import React from 'react';
//import './player-cards.scss';

import Card from '../card/card.jsx'
const CardRoyal2Icon = '../../../../assets/img/game/colourful.svg';
const CardElegent2Icon = '../../../../assets/img/game/cardelegant.svg';
const CardCool2Icon = '../../../../assets/img/game/cardcool.svg';
const CardTrendy2Icon = '../../../../assets/img/game/cardtrendy.svg';

const CardRoyal = '../../../../assets/img/table-settings/svg/cardroyal-1.svg';
const CardElegent = '../../../../assets/img/table-settings/svg/cardelegant.svg';
const CardCool = '../../../../assets/img/table-settings/svg/cardcool.svg';
const CardTrendy = '../../../../assets/img/table-settings/svg/cardtrendy.svg';

const carBack = {
      holdem: {
        royal:  CardRoyal2Icon,
        elegent: CardElegent2Icon,
        cool: CardCool2Icon,
        trendy: CardTrendy2Icon
      },
      omaha: {
        royal:  CardRoyal,
        elegent: CardElegent,
        cool: CardCool,
        trendy: CardTrendy
      }
    }
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
          <img className="card-back-wrapper icon-wrapper" src={carBack[this.props.gameType][this.props.selectedCardBackTheme]} />
        </div>
      }
      </div>
    );
  }
}
