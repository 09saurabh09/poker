import React from 'react';

import './game-table.scss';

import Player from '../player/player';
import GamePot from '../game-pot/game-pot';
import PlayerChips from '../player-chips/player-chips';
import Card from '../card/card'

export default class GameTable extends React.Component{

  constructor(props) {
    super(props);
    this.state = {potValue: 0};
    $(document).ready(function() {
        $(window).resize(function() {
          if($('.main-table').height() <= ($(window).height() * .65) ){
            $('.main-table').width( $(window).width() * .75 );
            $('.main-table').height( $(window).width() * .40 );
          } else {
            $('.main-table').height( $(window).height() * .70);
            $('.main-table').width( $('.main-table').height() * 2 );
          }
        }).resize();
    });
  }

  componentDidMount() {
    /*this.timerID = setInterval(
      () => this.tick(),
      500
    );*/
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    if(this.state.potValue >= 100) {
      clearInterval(this.timerID);
      return;
    }
    this.setState({
      potValue: this.state.potValue + 1
    });
  }

  render() {
    let allPlayers = Array.apply(null, Array(9)).map(Number.prototype.valueOf,0);
    let tableCards = [{suit: "diams", value: "A"},{suit: "diams", value: "Q"},{suit: "diams", value: 3},{suit: "diams", value: 2}, {suit: "diams", value: 10}];
    return (
      <div className="game-table">
        <div className="main-table">
            <GamePot potFilled={this.state.potValue}/>
            <div className="table-center">
              {tableCards.map((element, index)=> 
                <div key={index} className="game-cards-container">
                  <Card card={element}/>
                </div>
              )}
            </div>
           {allPlayers.map((element, index)=> 
            <div key={index} className={'game-player ' + 'player' + index}>
              <Player />
              <PlayerChips chipsValue={index + 100}/>
            </div>
            )}
        </div>
      </div>
    );
  }
}
