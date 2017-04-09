import React from 'react';

//import './game-table.scss';
import * as userApi from '../../../api/user-api';
import utils from '../../../utils/utils';

const CoinIcon = '../../../../assets/img/game/coin.svg';
const TimeBankIcon = '../../../../assets/img/game/time-bank.svg';
const ExpandIcon = '../../../../assets/img/game/expand.svg';

import BuyinPref from '../buyin-pref/buyin-pref.jsx';
import OpenSeat from '../open-seat/open-seat.jsx';
import Player from '../player/player.jsx';
import GamePot from '../game-pot/game-pot.jsx';
import GameControlsPrimary from '../game-controls/game-controls-primary.jsx';
import GameControlsSecondary from '../game-controls/game-controls-secondary.jsx';
import GameActions from '../game-actions/game-actions.jsx';
import PlayerChips from '../player-chips/player-chips.jsx';
import Card from '../card/card.jsx';
import ReplayActions from '../replay-actions/replay-actions.jsx';
import Login from '../login/login.jsx';
import SitOut from '../sit-out/sit-out.jsx';

import { saveGameAction, removeGameAction, updateTimeBankInUse } from '../../../actions/game-state-actions';
const aspectRatio = 1.651376146788991;

export default class GameTable extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      chatHidden: false,
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
    let {gameData : oldGame} = this.props;
    let newGame = Object.assign({}, game);
    let players = newGame.players;
    
    if(newGame.round != undefined && newGame.round != 'idle' && newGame.round != 'deal' && newGame.round != 'showdown' && newGame.round != oldGame.round) {
      players.forEach((player, index)=>{
        if(player) {
          let oldPlayers = oldGame.players;
          player.betForLastRound = oldPlayers && oldPlayers[index] && oldPlayers[index].betForRound || 0;
        }
      })
      this.moveAllChipsToPot();
    }
    this.setState({
      players : this.rotateIfPlaying(players, nextProps.userData.id),
      gameState : newGame
    })
  }

  moveAllChipsToPot() {
    $('.player-chips').addClass(`move-to-pot`);
    let self = this;
    setTimeout(()=>{
      let players = self.state.players.slice(0);
      players.forEach((player)=>{
        if(player) {
          player.betForLastRound = 0;
        }
      })
      self.setState({
        players
      })
      $('.player-chips').removeClass(`move-to-pot`);
    }, 1000)
  }

  componentWillUpdate(nextProps, nextState) {
  }

  componentWillMount() {
    
  }

  componentDidMount() {
    $(document).ready(function() {
      $(window).resize(function() {
        let currentRatio = $('#game-table').width() / 720;
        $('body').css({ 'font-size': `${14 * currentRatio}px` });
      }).resize();
    });
  }

  componentWillUnmount() {
    
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

    }
  }

  tick() {

  }

  isPlayerSitOut() {
    let { players } = this.state;
    let isSitOut = false;
    players.forEach((player, index)=>{
      if(player && this.props.userData && player.id == this.props.userData.id && player.hasSitOut && player.idleForHand) {
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

  joinSeat(balance, straddle, isMaintainChips, autoPost) {
    let {gameState : game, players} = this.state;
    let seat = this.selectedSeat;
    let allPlayers;
    allPlayers = players.map((player, index) => {
      if(index == seat) {
        return {
          name : this.props.userData.userName,
          balance : balance,
          bbValue: balance/game.bigBlind
        }
      } else {
        return player;
      }
    })

    utils.closeModal('buyin-pref');
    let payload = {
      tableId: this.props.tableId,
      playerInfo: {
          chips: balance,
          isMaintainChips,
          seat: seat + 1,
          autoPost,
          straddle
      }
    };
    if(this.isHePlaying()) {
      this.props.authorizedSocket.emit('table-buy-in', payload );
      console.log('Event emited table-buy-in with payload ', payload)
    } else {
      this.props.authorizedSocket.emit('table-join', payload );
      console.log('Event emited table-join with payload ', payload)
    }
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
      call: 'sitOut'
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
    if(!this.props.isReplay && this.state.gameState.timeBankInUse != timeBankInUse) {
      timeBankInUse = !!timeBankInUse;
      this.props.dispatch(updateTimeBankInUse({timeBankInUse, tableId: this.props.tableId}));
    }
  }

  sitIn() {
    utils.closeModal('sit-out');
    let payload = {
      tableId : this.props.tableId,
      call: 'sitIn'
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
    }
    let dealerPos = this.getDealerPosition(players, game.dealerPos);
    let expectedCallValue = this.myExpectedCallValue(players, this.props.userData.id);
    let step = 1;
    if(game.bigBlind) {
      step = parseInt(game.bigBlind);
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
        {isCardPresent && !this.props.isReplay?
          <div>
            <div className={`game-actions-container${this.state.chatHidden ? ' open': ''}`} >
              <GameActions range={{min: parseInt(game.minRaise), max: parseInt(game.maxRaise) || parseInt(game.minRaise) + 1, 
                                    potValue: game.currentPot, step}}
                            callValue={expectedCallValue} onAction={this.onGameAction.bind(this)} 
                            bbValue={game.bigBlind}
                            flopState={game.round == 'deal' ? 'preFlop' : 'postFlop'} userData={this.props.userData}/>
            </div>
            <div className={`analytics-chat-container ${this.state.chatHidden ? 'closed': 'open'}`}>
              {this.state.chatHidden ? 
                <div className="expand-icon-container collapse" onClick={(e)=>{this.setState({chatHidden: false})}}>
                  <img className="expand-icon-wrapper icon-wrapper" src={ExpandIcon} />
                </div>
                : 
                <div className="chatbox">
                CHAT AND ANALYTICS PORTION
                <div className="expand-icon-container" onClick={(e)=>{this.setState({chatHidden: true})}}>
                  <img className="expand-icon-wrapper icon-wrapper" src={ExpandIcon} />
                </div>
                </div>
              }
            </div> 
          </div> : null }
        { this.props.isReplay ?
          <div className="game-actions-container">
            <ReplayActions replayAction={this.props.replayAction} playState={this.props.playState}/>
          </div> : null
        }
        <div className='main-table'>
            <GamePot potValue={game.potValue} totalPot={game.currentPot}/>
            {game.currentPot > 0 && game.round !== 'deal'? 
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
            {dealerPos > -1 ? 
            <div className={`dealer-button-postion max-${game.maxPlayer} dealer-${dealerPos}`}>
              <div className="dealer-button">D</div>
            </div> : null }
           {players.map((player, index)=> 
            <div key={index} className="seat">
              <div className={'game-player ' + 'player' + index}>
                {player !== null ? <Player  playerIndex={index} turnPos={game.turnPos}
                                            player={player} bigBlind={game.bigBlind} round={game.round}
                                            winner={winnerPlayerIndex == index} showCards={game.round !== undefined && game.round != 'idle'}
                                            gameType={game.gameType || 'holdem'} cardBackTheme={this.props.userData.cardBackTheme || 'royal'}
                                            lastTurnAt={game.lastTurnAt} actionTime={game.actionTime} updateTimeBankInUse={this.updateTimeBank.bind(this)}
                                            /> : null }
                {player === null ? <OpenSeat onJoinSeat={this.openBuyinPref.bind(this, index)}/> : null }
              </div>
              {player && (player.betForRound || player.betForLastRound)?
                <PlayerChips className={`player-${index}-chips`} 
                chipsValue={parseFloat(parseFloat(player.betForRound || player.betForLastRound).toFixed(2))} />
                : null }
            </div>
            )}
           
        </div>
        {game.minAmount != game.maxAmount ? <BuyinPref bbValue={{min:game.minAmount/game.bigBlind, max:game.maxAmount/game.bigBlind, 
                                                        value: this.props.userData.defaultBB || ((game.maxAmount+game.minAmount)*0.6)/game.bigBlind, step:game.bigBlind}} 
                                                        bigBlind={game.bigBlind} avgStack={game.avgStack || 0}
                                                        bankroll={this.props.userData.currentBalance} onSet={this.joinSeat.bind(this)}/> 
                                                    : null }
        <Login postLogin={this.postLoginStaff.bind(this)} dispatch={this.props.dispatch}/>
        <SitOut open={!this.props.isReplay && this.isPlayerSitOut()} sitin={this.sitIn.bind(this)}/>
      </div>
    );
  }
}
