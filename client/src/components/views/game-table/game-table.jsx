import React from 'react';

//import './game-table.scss';
import * as userApi from '../../../api/user-api';
import utils from '../../../utils/utils';

const CoinIcon = '../../../../assets/img/game/coin.svg';
const TimeBankIcon = '../../../../assets/img/game/time-bank.svg';

import BuyinPref from '../buyin-pref/buyin-pref.jsx';
import OpenSeat from '../open-seat/open-seat.jsx';
import Player from '../player/player.jsx';
import GamePot from '../game-pot/game-pot.jsx';
import GameControlsPrimary from '../game-controls/game-controls-primary.jsx';
import GameControlsSecondary from '../game-controls/game-controls-secondary.jsx';
import GameActions from '../game-actions/game-actions.jsx';
import PlayerChips from '../player-chips/player-chips.jsx';
import Card from '../card/card.jsx';
//import DealerButton from '../dealerButton/dealerButton.jsx';
import Login from '../login/login.jsx';
import SitOut from '../sit-out/sit-out.jsx';

import { saveGameAction, removeGameAction, updateTimeBankInUse } from '../../../actions/game-state-actions';
const aspectRatio = 1.651376146788991;

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
        round: 'idle',
        communityCards: [],
        players: [],
        actionTime: 0,
        lastTurnAt: 0,
        timeBankInUse: false
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
        if($('#game-table').height() * aspectRatio  < $('#game-table').width()) {
          $('#game-table').width($('#game-table').height() * aspectRatio);
        } else if($('#game-table').height() * aspectRatio  > $('#game-table').width()) {
          $('#game-table').height($('#game-table').width() / aspectRatio);
        } else {
          console.log('achieved ratio');
        }
        let currentRatio = $('#game-table').width() / 720;
        $('body').css({ 'font-size': `${14 * currentRatio}px` });
      }).resize();
    });
  }

  componentWillUnmount() {
    //clearInterval(this.timerID);
  }

  myExpectedCallValue(players, id) {
    if(!id) {
      return 0;
    }
    let myPlayer = players.filter((player)=>{return player && player.id == id});
    let expectedCallValue = myPlayer && myPlayer[0] && myPlayer[0].expCallValue;
    return parseFloat(parseFloat(expectedCallValue).toFixed(2));
  }

  componentDidUpdate(prevProps, prevState) {
    let { dispatch, authorizedSocket } = this.props;
    let { gameState: game, players } = this.state;
    if(game.payload && game.payload.call == 'callOrCheck' && game.payload.amount != this.myExpectedCallValue(players, this.props.userData.id)) {
      console.log('Call/check value changed');
      $('.game-actions button').removeClass('active');
      this.props.dispatch(removeGameAction(game.payload));
      return;
    }
    if(this.isMyTurn() && game.payload) {
      console.log('Event emited player-turn with payload ', game.payload);
      authorizedSocket.emit('player-turn', game.payload);
      $('.game-actions button').removeClass('active');
      this.props.dispatch(removeGameAction(game.payload));
      this.props.dispatch(updateTimeBankInUse({false, tableId: this.props.tableId}));
    }
  }

  tick() {

  }

  isPlayerSitOut() {
    let { players } = this.state;
    let isSitOut = false;
    players.forEach((player, index)=>{
      if(player && this.props.userData && player.id == this.props.userData.id && player.hasSitOut) {
        isSitOut = true;
      }
    })
    
    return isSitOut;
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

  isCardPresent(players, id) {
    let cardPresent = false;
    players.forEach((player)=>{
      if(player && id && player.id == id && player.cards && player.cards.length > 0) {
        cardPresent = true;
      }
    })
    return cardPresent;
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

  postLoginStaff() {
    this.openBuyinPref(this.selectedSeat);
    this.props.dispatch(userApi.getMyTables());
  }

  addMoney() {
    if(localStorage.getItem('userToken')) {
      utils.openModal('buyin-pref');
    } else {
      utils.openModal('login');
    }
  }

  openBuyinPref(seat) {
    if(this.isHePlaying()) {
      return;
    }
    this.selectedSeat = seat;
    this.addMoney();
    
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
/*    this.setState({
      players : this.rotatePlayers(allPlayers, seat)
    })*/
    utils.closeModal('buyin-pref');
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
      amount: parseFloat(parseFloat(amount).toFixed(2))
    }
    if(this.isMyTurn()) {
      console.log('Event emited player-turn with payload ', payload)
      this.props.authorizedSocket.emit('player-turn', payload);
      this.props.dispatch(updateTimeBankInUse({false, tableId: this.props.tableId}));
    } else {
      let { gameState: game } = this.state;
      if(game.payload && game.payload.call == call) {
        $('.game-actions button').removeClass('active');
        this.props.dispatch(removeGameAction(game.payload));
      } else {
      //queue the action
        this.props.dispatch(saveGameAction(payload));
        $('.game-actions button').removeClass('active');
        $(event.currentTarget).addClass('active');
      }
    }
    
  }

  leaveTable() {
    let payload = {
      tableId : this.props.tableId
    }
    console.log('Event emited table-leave with payload ', payload)
    this.props.authorizedSocket.emit('table-leave', payload);
    this.props.tableLeave();
  }

  sitOutTable() {
    let payload = {
      tableId : this.props.tableId,
      playerInfo: {
        call: 'sitOut'
      }
    }
    console.log('Event emited game-preference-update with payload ', payload)
    this.props.authorizedSocket.emit('game-preference-update', payload);
    utils.openModal('sit-out');
    this.props.sitOutTable();
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

  getDealerPosition(players, dealerPos) {
    let localDealerPos = -1;
    players.forEach((player, index) => {
      if(player && player.seat - 1 == dealerPos) {
        localDealerPos = index;
      }
    })
    return localDealerPos;
  }

  updateTimeBank(timeBankInUse) {
    this.props.dispatch(updateTimeBankInUse({timeBankInUse, tableId: this.props.tableId}));
  }

  sitIn() {
    utils.closeModal('sit-out');
    let payload = {
      tableId : this.props.tableId,
      playerInfo: {
        call: 'sitIn'
      }
    }
    console.log('Event emited game-preference-update with payload ', payload)
    this.props.authorizedSocket.emit('game-preference-update', payload);
    this.props.sitInTable();
  }

  render() {
    let {gameState : game, players} = this.state;
    let winHandName;
    let winnerPlayerId, winnerPlayerIndex = -1;
    game.maxRaise = game.maxRaise || 100;
    if(game.round == 'showdown'){
      winnerPlayerId = game.gamePots && game.gamePots[0] && game.gamePots[0].winners && game.gamePots[0].winners[0] || winnerPlayerId;
      winnerPlayerIndex = this.getPlayerIndexFromId(players, winnerPlayerId);
      let potChips = $('.pot-chips');
      let classes = potChips && potChips.attr('class') && potChips.attr('class').split(' ');
      classes && classes.forEach((cl)=>{
        if(cl !== 'pot-chips') {
          potChips.removeClass(cl);
        }
      })
      $('.pot-chips').addClass(`moved-to-player${winnerPlayerIndex}`);
      winHandName = game.gamePots && game.gamePots[0] && game.gamePots[0].winnerHand;
      setTimeout(()=>{
        let potChips = $('.pot-chips');
        let classes = potChips && potChips.attr('class') && potChips.attr('class').split(' ');
        classes && classes.forEach((cl)=>{
          if(cl !== 'pot-chips') {
            potChips.removeClass(cl);
          }
        })
      }, 2000)
    }
    let dealerPos = this.getDealerPosition(players, game.dealerPos);
    let expectedCallValue = this.myExpectedCallValue(players, this.props.userData.id);
    let step = 1;
    if(game.bigBlind) {
      step = parseFloat(game.bigBlind)/2;
    }
    let isCardPresent = this.isCardPresent(players, this.props.userData.id);
    return (
      <div className='game-table' id="game-table">
        <div className='game-controls-container primary'>
          <GameControlsPrimary leaveTable={this.leaveTable.bind(this)} sitOutTable={this.sitOutTable.bind(this)} />
        </div>
        <div className='game-controls-container secondary'>
          <GameControlsSecondary onReplayClick={this.props.onReplayClick} onAddMoney={this.addMoney.bind(this)}/>
        </div>
        {game.timeBankInUse ? <div className="time-bank">
          <div className="time-bank-icon-container">
            <img className="time-bank-icon-wrapper icon-wrapper" src={TimeBankIcon} />
          </div>
        </div> : null}
        {isCardPresent ?
        <div className="game-actions-container">
          <GameActions range={{min: parseInt(game.minRaise), max: parseInt(game.maxRaise) || parseInt(game.minRaise) + 1, 
                                potValue: game.currentPot, step}}
                        callValue={expectedCallValue} onAction={this.onGameAction.bind(this)} 
                        flopState={game.round == 'deal' ? 'preFlop' : 'postFlop'} userData={this.props.userData}/>
        </div> : null }
        <div className='main-table'>
            <GamePot potValue={game.potValue} totalPot={game.currentPot}/>
            {game.currentPot > 0 ? 
            <div className="pot-chips">
              <div className="coin-icon-container">
                <img className="coin-icon-wrapper icon-wrapper" src={CoinIcon} />
              </div>
              <div className="coin-icon-container">
                <img className="coin-icon-wrapper icon-wrapper" src={CoinIcon} />
              </div>
              <div className="coin-icon-container">
                <img className="coin-icon-wrapper icon-wrapper" src={CoinIcon} />
              </div>
            </div> : null }
            <div className='table-center'>
              {game.communityCards && game.communityCards.map((element, index)=> 
                <div key={index} className='game-cards-container'>
                  <Card card={element}/>
                </div>
              )}
              { winHandName ? <div className="winner-hand"> {winHandName} </div> : null }
            </div>
            {isCardPresent ? 
            <div className={`dealer-button-postion max-${game.maxPlayer} dealer-${dealerPos}`}>
              <div className="dealer-button">D</div>
            </div> : null }
           {players.map((player, index)=> 
            <div key={index} className={'game-player ' + 'player' + index}>
              {player !== null ? <Player  playerIndex={index} turnPos={game.turnPos} 
                                          player={player} bigBlind={game.bigBlind} round={game.round}
                                          winner={winnerPlayerIndex == index} showCards={game.round !== undefined && game.round != 'idle'}
                                          gameType={game.gameType || 'holdem'} cardBackTheme={this.props.userData.cardBackTheme || 'royal'}
                                          lastTurnAt={game.lastTurnAt} actionTime={game.actionTime} updateTimeBankInUse={this.updateTimeBank.bind(this)}
                                          /> : null }
              {player === null ? <OpenSeat onJoinSeat={this.openBuyinPref.bind(this, index)}/> : null }
              {player && player.betForRound ? <PlayerChips chipsValue={parseFloat(parseFloat(player.betForRound).toFixed(2))} />: null }
            </div>
            )}
           
        </div>
        {game.minAmount != game.maxAmount ? <BuyinPref bbValue={{min:game.minAmount/game.bigBlind, max:game.maxAmount/game.bigBlind, 
                                                        value: this.props.userData.defaultBB || ((game.maxAmount+game.minAmount)*0.6)/game.bigBlind, step:game.bigBlind}} 
                                                        bigBlind={game.bigBlind} avgStack={game.avgStack || 0}
                                                        bankroll={this.props.userData.currentBalance} onSet={this.joinSeat.bind(this)}/> 
                                                    : null }
        <Login postLogin={this.postLoginStaff.bind(this)} dispatch={this.props.dispatch}/>
        <SitOut open={this.isPlayerSitOut()} sitin={this.sitIn.bind(this)}/>
      </div>
    );
  }
}
