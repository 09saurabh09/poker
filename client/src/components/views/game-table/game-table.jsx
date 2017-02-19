import React from 'react';

if(process.env.WEBPACK) {
  require( './game-table.scss' );
}

import BuyinPref from '../buyin-pref/buyin-pref.jsx';
import OpenSeat from '../open-seat/open-seat.jsx';
import Player from '../player/player.jsx';
import GamePot from '../game-pot/game-pot.jsx';
import GameControls from '../game-controls/game-controls.jsx';
import GameActions from '../game-actions/game-actions.jsx';
import PlayerChips from '../player-chips/player-chips.jsx';
import Card from '../card/card.jsx';
import Login from '../login/login.jsx';

export default class GameTable extends React.Component{

  constructor(props) {
    super(props);
    this.game = this.props.gameData[this.props.tableId] || {
      turnPos: 0,
      minAmount: 0,
      maxAmount: 0,
      minRaise: 0,
      maxRaise: 0,
      maxPlayer: 0,
      potValue: 0,
      totalPot: 0,
      communityCards: [],
      players: []
    };
    this.state = {
      players : this.game.players.map((player, seat)=>{
        if(player === null) return null;
        else {
          return {
            ...player, 
            seat
          }   
        }
        
        }),
      turnPos: this.game.turnPos
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.game = nextProps.gameData[nextProps.tableId] || {
      turnPos: 0,
      minAmount: 0,
      maxAmount: 0,
      minRaise: 0,
      maxRaise: 0,
      maxPlayer: 0,
      potValue: 0,
      totalPot: 0,
      communityCards: [],
      players: []
    };
    this.setState({
      players : this.game.players.map((player, seat)=>{
        if(player === null) return null;
        else {
          return {
            ...player, 
            seat
          }   
        }
        
        }),
      turnPos: this.game.turnPos
    })
  }

  componentWillMount() {
    
  }

  componentDidMount() {
    /*this.timerID = setInterval(
      () => this.tick(),
      20000
    );*/
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
      communityCards: tableCards
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
    if(localStorage.getItem('userToken')) {
      var modal = document.getElementById('buyin-pref');
      modal.style.display = 'block';
    } else {
      var modal = document.getElementById('login');
      modal.style.display = 'block';
    }
    
  }

  joinSeat(balance, maintainStack, autoPost) {
    let seat = this.selectedSeat;
    let allPlayers = this.state.players;
    allPlayers = allPlayers.map((player, index) => {
      if(index == seat) {
        return {
          name : this.props.userData.name,
          balance : balance,
          bbValue: balance/this.game.bigBlind,
          onTable : true
        }
      } else {
        return player;
      }
    })
    /*allPlayers.forEach((player, index)=>{
      if(index == seat) {
        player.name = 'ITS ME!! Bitch';
        player.onTable = !player.hasDone;
      }
    }); */
    this.setState({
      players : this.rotatePlayers(allPlayers, seat)
    })
    var modal = document.getElementById('buyin-pref');
    modal.style.display = 'none';
    this.props.authorizedSocket.emit('table-join', {
      "tableId": this.props.tableId,
      "playerInfo": {
          "chips": balance,
          "isMaintainChips": maintainStack,
          "seat": this.selectedSeat
      }
    } );
  }

  render() {
    
    let myTurn = this.state.players[this.state.turnPos] && this.state.players[this.state.turnPos].id == this.props.userData.id;
    let gameActionsElement = <div className="game-actions-container">
                                <GameActions range={{min: this.game.minRaise, max: this.game.maxRaise, 
                                  potValue: this.game.totalPot, step: 1}} callValue={this.game.callValue}/>
                              </div> ;
    return (
      <div className='game-table'>
        <div className='game-controls-container'>
          <GameControls />  
        </div>
        {myTurn ? gameActionsElement : null}
        <div className='main-table'>
            <GamePot potValue={this.game.potValue} totalPot={this.game.totalPot}/>
            <div className='table-center'>
              {this.game.communityCards && this.game.communityCards.map((element, index)=> 
                <div key={index} className='game-cards-container'>
                  <Card card={element}/>
                </div>
              )}
            </div>
           {this.state.players.map((player, index)=> 
            <div key={index} className={'game-player ' + 'player' + index}>
              {player !== null ? <Player turnPos={this.state.turnPos} player={player}/> : null }
              {player === null ? <OpenSeat onJoinSeat={this.openBuyinPref.bind(this, index)}/> : null }
              {player && player.chipsValue ? <PlayerChips chipsValue={player.chipsValue} />: null }
            </div>
            )}
        </div>
        {this.game.minAmount != this.game.maxAmount ? <BuyinPref bbValue={{min:this.game.minAmount/this.game.bigBlind, max:this.game.maxAmount/this.game.bigBlind, 
                                                        value: this.game.minAmount/this.game.bigBlind, step:this.game.bigBlind}} bigBlind={this.game.bigBlind} onSet={this.joinSeat.bind(this)}/> 
                                                    : null }
        <Login postLogin={this.openBuyinPref.bind(this, this.selectedSeat)}/>
      </div>
    );
  }
}
