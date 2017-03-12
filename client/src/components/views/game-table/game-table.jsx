import React from 'react';

//import './game-table.scss';
import Svg from '../svg/svg.jsx';
import CoinIcon from '../../../../assets/img/game/coin.svg';

import BuyinPref from '../buyin-pref/buyin-pref.jsx';
import OpenSeat from '../open-seat/open-seat.jsx';
import Player from '../player/player.jsx';
import GamePot from '../game-pot/game-pot.jsx';
import GameControls from '../game-controls/game-controls.jsx';
import GameActions from '../game-actions/game-actions.jsx';
import PlayerChips from '../player-chips/player-chips.jsx';
import Card from '../card/card.jsx';
import Login from '../login/login.jsx';

import { saveGameAction, removeGameAction } from '../../../actions/game-state-actions';

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
    let game = nextProps.gameData;
    if(!game || Object.keys(game).length == 0) {
      return;
    }
    this.setState({
      players : this.rotateIfPlaying(game.players, nextProps.userData.id),
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
      }).resize();
    });
  }

  componentWillUnmount() {
    //clearInterval(this.timerID);
  }

  componentDidUpdate(prevProps, prevState) {
    let { dispatch, authorizedSocket } = this.props;
    let { gameState: game } = prevState;
    if(this.isMyTurn() && game.payload) {
      console.log('Event emited player-turn with payload ', game.payload);
      authorizedSocket.emit('player-turn', game.payload);
      $('.game-actions button').removeClass('active');
      this.props.dispatch(removeGameAction(game.payload));
    }
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

  rotateIfPlaying(players, userId) {
    let playing = false;
    let seat;
    players.forEach((player, index)=>{
      if(player && player.id == userId) {
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

  isMyTurn() {
    let myTurn = false;
    this.state.players.forEach((player)=>{
      if(player && player.id == this.props.userData.id 
        && player.seat - 1 == this.state.gameState.turnPos) {
        myTurn = true;
      }
    });
    return myTurn;
  }

  openBuyinPref(seat) {
    if(this.isHePlaying()) {
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

  onGameAction(event, call, amount) {
    let payload = {
      tableId : this.props.tableId,
      call,
      amount: parseInt(amount)
    }
    if(this.isMyTurn()) {
      console.log('Event emited player-turn with payload ', payload)
      this.props.authorizedSocket.emit('player-turn', payload);
    } else {
      //queue the action
      this.props.dispatch(saveGameAction(payload));
      $('.game-actions button').removeClass('active');
      $(event.currentTarget).addClass('active');
    }
    
  }

  leaveTable() {
    let payload = {
      tableId : this.props.tableId
    }
    console.log('Event emited table-leave with payload ', payload)
    this.props.authorizedSocket.emit('table-leave', payload);
  }

  getPlayerIndexFromId(players, playerId) {
    let playerIndex = -1;
    players.forEach((player, index)=>{
      if(player && player.id == playerId) {
        playerIndex = index;
      }
    })
    return playerIndex;
  }

  render() {
    let {gameState : game, players} = this.state;
    let winnerPlayerId, winnerPlayerIndex = -1;
    game.maxRaise = game.maxRaise || 100;
    if(game.round == 'showdown'){
      winnerPlayerId = game.gamePots[0].winners && game.gamePots[0].winners[0];
      winnerPlayerIndex = this.getPlayerIndexFromId(players, winnerPlayerId);
      let potChips = $('.pot-chips');
      let classes = potChips && potChips.attr('class') && potChips.attr('class').split(' ');
      classes && classes.forEach((cl)=>{
        if(cl !== 'pot-chips') {
          potChips.removeClass(cl);
        }
      })
      $('.pot-chips').addClass(`moved-to-player${winnerPlayerIndex}`);
    }
    return (
      <div className='game-table'>
        <div className='game-controls-container'>
          <GameControls leaveTable={this.leaveTable.bind(this)} onReplayClick={this.props.onReplayClick}/>
        </div>
        <div className="game-actions-container">
          <GameActions range={{min: parseInt(game.minRaise), max: parseInt(game.maxRaise) || parseInt(game.minRaise) + 1, 
                                potValue: game.totalPot, step: 1}} 
                        callValue={game.callValue} onAction={this.onGameAction.bind(this)} />
        </div>
        <div className='main-table'>
            <GamePot potValue={game.potValue} totalPot={game.totalPot}/>
            {game.totalPot > 0 ? 
            <div className="pot-chips">
              <div className="coin-icon-container">
                <Svg className="coin-icon-wrapper icon-wrapper" markup={CoinIcon} />
              </div>
              <div className="coin-icon-container">
                <Svg className="coin-icon-wrapper icon-wrapper" markup={CoinIcon} />
              </div>
              <div className="coin-icon-container">
                <Svg className="coin-icon-wrapper icon-wrapper" markup={CoinIcon} />
              </div>
            </div> : null }
            <div className='table-center'>
              {game.communityCards && game.communityCards.map((element, index)=> 
                <div key={index} className='game-cards-container'>
                  <Card card={element}/>
                </div>
              )}
            </div>
           {players.map((player, index)=> 
            <div key={index} className={'game-player ' + 'player' + index}>
              {player !== null ? <Player playerIndex={index} turnPos={game.turnPos} player={player} bigBlind={game.bigBlind} winner={winnerPlayerIndex == index} showCards={game.round != 'idle'}/> : null }
              {player === null ? <OpenSeat onJoinSeat={this.openBuyinPref.bind(this, index)}/> : null }
              {player && player.betForRound ? <PlayerChips chipsValue={player.betForRound} />: null }
            </div>
            )}
        </div>
        {game.minAmount != game.maxAmount ? <BuyinPref bbValue={{min:game.minAmount/game.bigBlind, max:game.maxAmount/game.bigBlind, 
                                                        value: this.props.userData.defaultBB || ((game.maxAmount+game.minAmount)/2)/game.bigBlind, step:game.bigBlind}} 
                                                        bigBlind={game.bigBlind} avgStack={game.avgStack || 0}
                                                        bankroll={this.props.userData.currentBalance} onSet={this.joinSeat.bind(this)}/> 
                                                    : null }
        <Login postLogin={this.openBuyinPref.bind(this, this.selectedSeat)} dispatch={this.props.dispatch}/>
      </div>
    );
  }
}
