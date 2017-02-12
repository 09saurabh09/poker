import React from 'react';

import './game-table.scss';

import BuyinPref from '../buyin-pref/buyin-pref.jsx';
import Player from '../player/player';
import GamePot from '../game-pot/game-pot';
import GameControls from '../game-controls/game-controls';
import GameActions from '../game-actions/game-actions';
import PlayerChips from '../player-chips/player-chips';
import Card from '../card/card'

export default class GameTable extends React.Component{

  constructor(props) {
    super(props);
    
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
    
    this.game = this.props.gameData[this.props.tableId] || {
      numberOfPlayer: 0,
      potValue: 0,
      totalPot: 0,
      range : {min: 0, max: 1, value: 0, potValue: 0, step: 1},
      flopCards: [],
      players: []
    };
    this.state = {
      players : this.game.players
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.game = nextProps.gameData[nextProps.tableId] || {
      numberOfPlayer: 0,
      potValue: 0,
      totalPot: 0,
      range : {min: 0, max: 1, value: 0, potValue: 0, step: 1},
      tableCards: [],
      flopCards: [],
      players: []
    };
    this.setState({
      players : this.game.players
    })
  }

  componentWillMount() {
    
  }

  componentDidMount() {
    /*this.timerID = setInterval(
      () => this.tick(),
      20000
    );*/
  }

  componentWillUnmount() {
    //clearInterval(this.timerID);
  }

  tick() {
    /*if(this.game.potValue >= 100) {
      clearInterval(this.timerID);
      return;
    }
    let tableCards = this.game.tableCards;//[{suit: 'diams', value: 'A'},{suit: 'hearts', value: 'Q'},{suit: 'diams', value: 3},{suit: 'diams', value: 2}, {suit: 'diams', value: 10}];
    if (this.game.potValue <= 50) {
      tableCards = [];
    } else if(this.game.potValue >= 75 && this.game.potValue <99) {
      tableCards.splice(3, 1);
    } else if(this.game.potValue >= 50 && this.game.potValue < 75) {
      tableCards.splice(2, 2);
    } 
    this.setState({
      potValue: this.game.potValue + 1,
      flopCards: tableCards
    });*/
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

  openBuyinPref(seat) {
    this.selectedSeat = seat;
    var modal = document.getElementById('buyin-pref');
    modal.style.display = 'block';
  }

  joinSeat() {
    let seat = this.selectedSeat;
    let allPlayers = this.state.players;
    allPlayers.forEach((player, index)=>{
      if(index == seat) {
        player.seatOpen = false;
        player.name = 'ITS ME!! Bitch';
        player.onTable = true;
      }
    }); 
    this.setState({
      players : this.rotatePlayers(allPlayers, seat)
    })
    var modal = document.getElementById('buyin-pref');
    modal.style.display = 'none';
  }

  render() {
    return (
      <div className='game-table'>
        <div className='game-controls-container'>
          <GameControls />  
        </div>
        <div className='game-actions-container'>
          <GameActions range={this.game.range}/>
        </div>
        <div className='main-table'>
            <GamePot potValue={this.game.potValue} totalPot={this.game.totalPot}/>
            <div className='table-center'>
              {this.game.flopCards.map((element, index)=> 
                <div key={index} className='game-cards-container'>
                  <Card card={element}/>
                </div>
              )}
            </div>
           {this.state.players.map((player, index)=> 
            <div key={index} className={'game-player ' + 'player' + index}>
              <Player player={player} onJoinSeat={this.openBuyinPref.bind(this, index)}/>
              <div className={player.seatOpen? 'hide' : ''}>
                <PlayerChips chipsValue={player.chipsValue} />
              </div>
            </div>
            )}
        </div>
        <BuyinPref bbValue={{min:0, max:100, value:60, step:1}} onSet={this.joinSeat.bind(this)}/>
      </div>
    );
  }
}
