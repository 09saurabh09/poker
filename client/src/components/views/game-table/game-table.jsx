import React from 'react';

import './game-table.scss';

import Player from '../player/player';
import GamePot from '../game-pot/game-pot';
import GameControls from '../game-controls/game-controls';
import GameActions from '../game-actions/game-actions';
import PlayerChips from '../player-chips/player-chips';
import Card from '../card/card'

export default class GameTable extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      potValue: 0,
      flopCards: []
    };
    $(document).ready(function() {
        $(window).resize(function() {
          if($('.main-table').height() <= ($(window).height() * .60) || $('.main-table').width() >= $(window).width() * .75 ){
            $('.main-table').width( $(window).width() * .70 );
            $('.main-table').height( $('.main-table').width() * 0.5 );
          } else {
            $('.main-table').height( $(window).height() * .65);
            $('.main-table').width( $('.main-table').height() * 2 );
          }
          $('.game-table').height( $('.main-table').height() + 230);
        }).resize();
    });
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    if(this.state.potValue >= 100) {
      clearInterval(this.timerID);
      return;
    }
    let tableCards = [{suit: "diams", value: "A"},{suit: "diams", value: "Q"},{suit: "diams", value: 3},{suit: "diams", value: 2}, {suit: "diams", value: 10}];
    this.setState({
      potValue: this.state.potValue + 1,
      flopCards: tableCards.slice(0, this.state.potValue+1)
    });
  }

  render() {
    let allPlayers = Array.apply(null, Array(9)).map(Number.prototype.valueOf,0);
    
    return (
      <div className="game-table">
        <div className="game-controls-container">
          <GameControls />  
        </div>
        <div className="game-actions-container">
          <GameActions />
        </div>
        <div className="main-table">
            <GamePot potFilled={this.state.potValue}/>
            <div className="table-center">
              {this.state.flopCards.map((element, index)=> 
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
