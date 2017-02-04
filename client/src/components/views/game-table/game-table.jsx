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
            $('.main-table').height( $('.main-table').width() * 0.45 );
          } else {
            $('.main-table').height( $(window).height() * .65);
            $('.main-table').width( $('.main-table').height() * 2.22 );
          }
          if($('.main-table').height() + 250 <= $(window).height()) {
            $('.game-table').height( $('.main-table').height() + 250);
          } else {
            $('.game-table').height( $(window).height());
          }
        }).resize();
    });
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      20000
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
    if (this.state.potValue <= 50) {
      tableCards = []
    } else if(this.state.potValue >= 99) {
      tableCards = tableCards;
    } else if(this.state.potValue >= 75) {
      tableCards.splice(3, 1);
    } else if(this.state.potValue >= 50) {
      tableCards.splice(2, 2);
    } 
    this.setState({
      potValue: this.state.potValue + 1,
      flopCards: tableCards
    });
  }

  render() {
    let allPlayers = Array.apply(null, Array(9)).map((ele, index)=>{
      if(index %2 == 0) {
        return {seatOpen: false,
          name: 'Amar Nath Saha',
          balance: '$123',
          bbValue: 25,
          timer : 20
        }
      }
      return {
        seatOpen: true
      }
    });
    let range = {min: 100, max: 1000, value: 0, potValue: 800, step: 1}
    return (
      <div className="game-table">
        <div className="game-controls-container">
          <GameControls />  
        </div>
        <div className="game-actions-container">
          <GameActions range={range}/>
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
              <Player player={{...element, active: this.state.potValue % 9 == index ? true: false}}/>
              <div className={element.seatOpen? 'hide' : ''}>
                <PlayerChips chipsValue={index + 100} />
              </div>
            </div>
            )}
        </div>
      </div>
    );
  }
}
