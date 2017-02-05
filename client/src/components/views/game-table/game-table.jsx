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
    this.numberOfPlayer = 9;
    let allPlayers = Array.apply(null, Array(this.numberOfPlayer)).map((ele, index)=>{
      return {
        name: 'Amar Nath Saha',
        balance: `${100*index}`,
        bbValue: 25 + index,
        timer : 20,
        seat: index,
        seatOpen: false,
        onTable: true
      }
    });
    this.state = {
      potValue: 0,
      flopCards: [],
      players : allPlayers
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
    let tableCards = [{suit: 'diams', value: 'A'},{suit: 'diams', value: 'Q'},{suit: 'diams', value: 3},{suit: 'diams', value: 2}, {suit: 'diams', value: 10}];
    if (this.state.potValue <= 50) {
      tableCards = [];
    } else if(this.state.potValue >= 75 && this.state.potValue <99) {
      tableCards.splice(3, 1);
    } else if(this.state.potValue >= 50 && this.state.potValue < 75) {
      tableCards.splice(2, 2);
    } 
    this.setState({
      potValue: this.state.potValue + 1,
      flopCards: tableCards
    });
  }

  rotatePlayers(array, baseIndex) {
    if(isNaN(baseIndex) || baseIndex < 0) {
      throw "provide valid order";
    }

    if(array.length == 0) {
      throw "provide valid array";
    }

    let leftSideArray = array.slice(0, baseIndex);
    let rightSideArray = array.slice(baseIndex);
    return [...rightSideArray, ...leftSideArray];
  }

  joinSeat(seat) {
    let allPlayers = this.state.players;
    allPlayers.forEach((player)=>{
      if(player.seat == seat) {
        player.seatOpen = false;
        player.name = 'ITS ME!! Bitch'
      }
    }); 
    this.setState({
      players : this.rotatePlayers(allPlayers, seat)
    })
  }

  render() {
    let range = {min: 100, max: 1000, value: 0, potValue: 800, step: 1}
    return (
      <div className='game-table'>
        <div className='game-controls-container'>
          <GameControls />  
        </div>
        <div className='game-actions-container'>
          <GameActions range={range}/>
        </div>
        <div className='main-table'>
            <GamePot potFilled={this.state.potValue}/>
            <div className='table-center'>
              {this.state.flopCards.map((element, index)=> 
                <div key={index} className='game-cards-container'>
                  <Card card={element}/>
                </div>
              )}
            </div>
           {this.state.players.map((element, index)=> 
            <div key={index} className={'game-player ' + 'player' + index}>
              <Player player={{...element, active: this.state.potValue % this.numberOfPlayer == element.seat ? true: false}} onJoinSeat={this.joinSeat.bind(this)}/>
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
