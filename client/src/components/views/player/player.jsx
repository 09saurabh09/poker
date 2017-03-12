import React from 'react';
//import './player.scss';

import BasicUserCard from '../../../../assets/img/game/basic-user-card.svg';
import PlayerCards from '../player-cards/player-cards.jsx';
import Svg from '../svg/svg.jsx';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeElapsed: parseInt((Date.now() - this.props.player.timerStarted)/1000),
      turnTimerFinished: false 
    }
  }

  setTimer() {
    clearTimeout(this.timerId);
    let totalTime = this.state.turnTimerFinished ? this.props.player.timeBank : this.props.player.timer;
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
  }

  componentWillUpdate(nextProps, nextState) {
    if(!nextState.turnTimerFinished && nextProps.player.timer == nextState.timeElapsed) {
      clearTimeout(this.timerId);
      setTimeout(()=>{
        this.setState({
          timeElapsed: 0,
          turnTimerFinished: true
        })  
      }, 1000);
    }
    else if(nextState.turnTimerFinished && nextProps.player.timeBank == nextState.timeElapsed) {
      clearTimeout(this.timerId);
      this.timerId = setTimeout(()=>{
        this.setState({
          timeElapsed: 0,
          turnTimerFinished: false
        })  
      }, 1000);
    }
  }


  render() {
    let totalTime = this.state.turnTimerFinished ? this.props.player.timeBank : this.props.player.timer;
    let activeClassName = (this.props.player.seat - 1 == this.props.turnPos) ? 'active' : '';
    let onTableClassName = this.props.player.hasDone === false ? 'on-table' : '';
    let seatOpen = this.props.player.seatOpen ? 'hide' : '';
    let playing = !this.props.player.seatOpen ? 'hide' : '';
    let timeElapsed = ( this.state.timeElapsed )/totalTime * 100 ;
    let timerTopWidth, timerRightHeight, timerBottomWidth, timerLeftHeight ;
    timerTopWidth = timerRightHeight = timerBottomWidth = timerLeftHeight = 0;
    
    if(timeElapsed <= 25) {
      timerTopWidth = timeElapsed * 4 + '%';
      timerRightHeight = 0;
    } else if(timeElapsed > 25 && timeElapsed <= 50 ) {
      timerTopWidth = '100%';
      timerRightHeight = (timeElapsed -25) * 4 + '%';
    } else if (timeElapsed > 50 && timeElapsed <= 75 ) {
      timerTopWidth = '100%';
      timerRightHeight = '100%';
      timerBottomWidth = (timeElapsed - 50) * 4 + '%';
    } else if (timeElapsed > 75 && timeElapsed <= 100 ) {
      timerTopWidth = '100%';
      timerRightHeight = '100%';
      timerBottomWidth = '100%';
      timerLeftHeight = (timeElapsed - 75) * 4 + '%';
    }

    if(this.props.player.seat - 1 !== this.props.turnPos) {
      clearTimeout(this.timerId);
      this.timerId = undefined;
      timerTopWidth = timerRightHeight = timerBottomWidth = timerLeftHeight = 0;
    }

    return (
      <div className='player'>
        <div className={'sitting-player ' + seatOpen + ' '+ onTableClassName}>
          {this.props.showCards ? <div className='player-card-wrapper'>
            <PlayerCards cards={this.props.player.cards}/>
          </div>: null}
          <div className={'player-container ' + activeClassName}>
            
            <div className="timer-count">{totalTime - this.state.timeElapsed}</div>
            <div className='timer timer-top' style={{width: timerTopWidth}}></div>
            <div className='timer timer-right' style={{height: timerRightHeight}}></div>
            <div className='timer timer-bottom' style={{width: timerBottomWidth}}></div>
            <div className='timer timer-left' style={{height: timerLeftHeight}}></div>
            <Svg markup={BasicUserCard} className="basic-user-card-wrapper icon-wrapper" />
            <div className='player-wrapper'>
              <div className='player-dp'>
                <img src='' />
              </div>
              <div className='player-name'>{this.props.player.name}</div>
              <div className='player-color-container'>
                <div className='color-dot'></div>
              </div>
              <div className='player-money'>
                <div className='player-balance'>
                  {this.props.player.chips}
                </div>
                <div className='player-bb'>
                  BB <span className='bb-value'> {this.props.player.chips/this.props.bigBlind} </span>
                </div>
              </div>
              <div>
                
              </div>
              <div className='player-game-style'>
                <div className='hands-played'></div>
                <div className='raised'></div>
              </div>
              {this.props.winner ? <div className="winner-text"> WINNER </div>: null}
            </div>
          </div>  
        </div>
        
      </div>
    );
  }
}
