import React from 'react';

//import './game-table.scss';

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
    this.state = {
      players : [],
      gameState: {
        tableId: 0,
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
      }
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    let game = nextProps.gameData[nextProps.tableId];
    if(!game) {
      return;
    }
    this.setState({
      players : this.rotateIfPlaying(game.players),
      gameState : Object.assign({}, game)
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

  rotateIfPlaying(players) {
    let playing = false;
    let seat;
    players.forEach((player, index)=>{
      if(player && player.id == this.props.userData.id) {
        playing = true;
        seat = index;
      }
    })
    if(playing && seat !== undefined) {
      return this.rotatePlayers(players, seat);
    }
    return players;
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

  isHePlaying() {
    for(let i = 0 ; i<this.state.players.length; i++) {
      if(this.state.players[i] && this.state.players[i].id == this.props.userData.id) {
        return true;
      }
    }
    return false;
  }

  openBuyinPref(seat) {
    if(this.isHePlaying()) {
      alert('You are already playing');
      return;
    }
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
    let {gameState : game, players} = this.state;
    let seat = this.selectedSeat;
    let allPlayers;
    allPlayers = players.map((player, index) => {
      if(index == seat) {
        return {
          name : this.props.userData.name,
          balance : balance,
          bbValue: balance/game.bigBlind
        }
      } else {
        return player;
      }
    })
    this.setState({
      players : this.rotatePlayers(allPlayers, seat)
    })
    var modal = document.getElementById('buyin-pref');
    modal.style.display = 'none';
    let payload = {
      tableId: this.props.tableId,
      playerInfo: {
          chips: balance,
          isMaintainChips: maintainStack,
          seat: seat + 1
      }
    };
    this.props.authorizedSocket.emit('table-join', payload );
    console.log('Event emited table-join with payload ', payload)
  }

  onGameAction(call, amount) {
    let payload = {
      tableId : this.props.tableId,
      call,
      amount: parseInt(amount)
    }
    console.log('Event emited table-join with payload ', payload)
    this.props.authorizedSocket.emit('player-turn', payload);
  }

  leaveTable() {
    let payload = {
      tableId : this.props.tableId
    }
    console.log('Event emited table-join with payload ', payload)
    this.props.authorizedSocket.emit('table-leave', payload);
  }

  render() {
    let {gameState : game, players} = this.state;
    let myTurn = false, playersPlaying = 0;
    players.forEach((player)=>{
      if(!!player) {
        playersPlaying++;
      }
      if(player && (player.id == this.props.userData.id) && (game.turnPos == player.seat - 1)) {
        myTurn = true;
      }
    });
    game.minRaise = parseInt(game.minRaise) || 10;
    game.maxRaise = parseInt(game.maxRaise) || 1000;
    game.callValue = parseInt(game.callValue) || 0;
    myTurn = myTurn && playersPlaying > 1 && game.minRaise < game.maxRaise;
    let gameActionsElement = <div className="game-actions-container">
                                <GameActions range={{min: game.minRaise, max: game.maxRaise, 
                                  potValue: game.totalPot, step: 1}} callValue={game.callValue} onAction={this.onGameAction.bind(this)} />
                              </div> ;
    return (
      <div className='game-table'>
        <div className='game-controls-container'>
          <GameControls leaveTable={this.leaveTable.bind(this)}/>
        </div>
        {myTurn ? gameActionsElement : null}
        <div className='main-table'>
            <GamePot potValue={game.potValue} totalPot={game.totalPot}/>
            <div className='table-center'>
              {game.communityCards && game.communityCards.map((element, index)=> 
                <div key={index} className='game-cards-container'>
                  <Card card={element}/>
                </div>
              )}
            </div>
           {players.map((player, index)=> 
            <div key={index} className={'game-player ' + 'player' + index}>
              {player !== null ? <Player turnPos={this.state.turnPos} player={player} bigBlind={game.bigBlind}/> : null }
              {player === null ? <OpenSeat onJoinSeat={this.openBuyinPref.bind(this, index)}/> : null }
              {player && player.betForRound ? <PlayerChips chipsValue={player.betForRound} />: null }
            </div>
            )}
        </div>
        {game.minAmount != game.maxAmount ? <BuyinPref bbValue={{min:game.minAmount/game.bigBlind, max:game.maxAmount/game.bigBlind, 
                                                        value: game.minAmount/game.bigBlind, step:game.bigBlind}} 
                                                        bigBlind={game.bigBlind} onSet={this.joinSeat.bind(this)}/> 
                                                    : null }
        <Login postLogin={this.openBuyinPref.bind(this, this.selectedSeat)} dispatch={this.props.dispatch}/>
      </div>
    );
  }
}
