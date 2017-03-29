import React from 'react';
//import './player.scss';

import PlayerCards from '../player-cards/player-cards.jsx';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeElapsed: 0,
      actionTimerFinished: false 
    }
  }

  setTimer() {
    clearTimeout(this.timerId);
    let totalTime = this.state.actionTimerFinished ? this.props.player.timeBank : this.props.actionTime;
    if((this.props.player.seat - 1 == this.props.turnPos) && this.state.timeElapsed < totalTime) {
      this.timerId = setTimeout(()=>{
        this.setState({
          timeElapsed: this.state.timeElapsed + 1
        })
      }, 1000);
    }
  }

  componentDidMount(){
    this.setTimer();
  }

  componentDidUpdate(){
    this.setTimer();
  }

  componentWillReceiveProps(nextProps, nextState){
    /*if(!nextProps.player.active) {
      clearTimeout(this.timerId);
      this.timerId = undefined;
      if(this.state.timeElapsed != 0) {
        this.setState({
          timeElapsed: 0
        })  
      }
    }*/
    if(nextProps.player.seat - 1 == nextProps.turnPos) {
      let actionTimerFinished = (Date.now() - new Date(nextProps.lastTurnAt).getTime() - nextProps.actionTime * 1000) > 0;
      let totalTime = actionTimerFinished ? nextProps.player.timeBank : nextProps.actionTime;
      let timeElapsed = parseInt((Date.now() - new Date(nextProps.lastTurnAt).getTime())/1000);
      if(timeElapsed > totalTime) {
        timeElapsed = totalTime;
        actionTimerFinished = false;
      }
      if(actionTimerFinished !== this.state.actionTimerFinished) {
        this.props.updateTimeBankInUse(actionTimerFinished);  
      }
      this.setState({
        timeElapsed,
        actionTimerFinished
      })
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if(!nextState.actionTimerFinished && nextProps.actionTime == nextState.timeElapsed) {
      this.props.updateTimeBankInUse(true);
      clearTimeout(this.timerId);
      setTimeout(()=>{
        this.setState({
          timeElapsed: 0,
          actionTimerFinished: true
        })  
      }, 1000);
    }
    else if(nextState.actionTimerFinished && nextProps.player.timeBank == nextState.timeElapsed) {
      clearTimeout(this.timerId);
      this.props.updateTimeBankInUse(false);
      this.timerId = setTimeout(()=>{
        this.setState({
          timeElapsed: 0,
          actionTimerFinished: false
        })  
      }, 1000);
    }
  }


  render() {
    let totalTime = this.state.actionTimerFinished ? this.props.player.timeBank : this.props.actionTime;
    let activeClassName = (this.props.player.seat - 1 == this.props.turnPos) ? 'active' : '';
    let onTableClassName = this.props.player.hasDone === false ? 'on-table' : '';
    let showCardClass = this.props.player.cards ? 'show-cards' : '';
    let timerTopWidth, timerRightHeight, timerBottomWidth, timerLeftHeight ;
    if(this.props.player.seat - 1 !== this.props.turnPos) {
      clearTimeout(this.timerId);
      this.timerId = undefined;
      timerTopWidth = timerRightHeight = timerBottomWidth = timerLeftHeight = 0;
    } else {
      let timeElapsed = ( this.state.timeElapsed )/totalTime;
      timerTopWidth = timerRightHeight = timerBottomWidth = timerLeftHeight = 0;
      let activePlayer = $('.player-wrapper.active');
      let activePlayerHeight = $('.player-wrapper.active').height();
      let activePlayerWidth = $('.player-wrapper.active').width();
      let perimeter = 2* (activePlayerHeight + activePlayerWidth);

      let coveredPerimeter = perimeter * timeElapsed;
      if(coveredPerimeter > 0 && coveredPerimeter <= activePlayerHeight) {
        timerLeftHeight = coveredPerimeter;
      } else if(coveredPerimeter > activePlayerHeight && coveredPerimeter<= activePlayerHeight+activePlayerWidth) {
        timerLeftHeight = activePlayerHeight;
        timerTopWidth = coveredPerimeter - activePlayerHeight;
      } else if(coveredPerimeter > activePlayerHeight+activePlayerWidth && coveredPerimeter <= ((2*activePlayerHeight) + activePlayerWidth)) {
        timerLeftHeight = activePlayerHeight;
        timerTopWidth = '100%';
        timerRightHeight = coveredPerimeter - (activePlayerHeight+activePlayerWidth) + 6;
      } else if(coveredPerimeter > ((2*activePlayerHeight) + activePlayerWidth) && coveredPerimeter < perimeter) {
        timerLeftHeight = activePlayerHeight;
        timerTopWidth = '100%';
        timerRightHeight = activePlayerHeight;
        timerBottomWidth = coveredPerimeter - ((2*activePlayerHeight) + activePlayerWidth);
      }  
    }
    
    return (
      <div className='player'>
        <div className={'sitting-player ' + ' '+ onTableClassName}>
          {this.props.showCards ? <div className={'player-card-wrapper ' + showCardClass}>
            <PlayerCards noCards={this.props.player.lastAction == 'fold' || this.props.player.idleForHand} cards={this.props.player.cards} gameType={this.props.gameType} cardBackTheme={this.props.cardBackTheme}/>
          </div>: null}
          <div className="player-container">
            <img src="../../../../assets/img/game/basic-user-card.svg" className="basic-user-card-wrapper icon-wrapper" />
            <div className={'player-wrapper ' + activeClassName}>
              <div className="timer-count">{totalTime - this.state.timeElapsed}</div>
              <div className='timer timer-top' style={{width: timerTopWidth}}></div>
              <div className='timer timer-right' style={{height: timerRightHeight}}></div>
              <div className='timer timer-bottom' style={{width: timerBottomWidth}}></div>
              <div className='timer timer-left' style={{height: timerLeftHeight}}></div>
              <div className="player-inner">
                <div className='player-dp'>
                  <img src='' />
                </div>
                <div className='player-name'>{this.props.player.name}</div>
                <div className='player-color-container'>
                  <div className='color-dot'></div>
                </div>
                <div className='player-money'>
                  <div className='player-balance'>
                    {this.props.player.chips && parseInt(this.props.player.chips)}
                  </div>
                  <div className='player-bb'>
                    BB <span className='bb-value'> {this.props.player.chips && this.props.bigBlind && parseInt(this.props.player.chips/this.props.bigBlind)} </span>
                  </div>
                </div>
                <div className='player-game-style'>
                  <div className='hands-played'></div>
                  <div className='raised'></div>
                </div>
              </div>
              {this.props.winner ? <div className="winner-text"> WINNER </div>: null}
            </div>
          </div>  
        </div>
      </div>
    );
  }
}
