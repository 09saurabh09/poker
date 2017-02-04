import React from 'react';
import './player.scss';

import BasicUserCard from '../../../../assets/img/game/basic-user-card.svg';
import OpenSeatIcon from '../../../../assets/img/game/open-seat.svg';
import JoinSeatIcon from '../../../../assets/img/game/join-seat.svg';
import PlayerCards from '../player-cards/player-cards';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seatOpen : this.props.player.seatOpen,
      timeRemaining: this.props.player.timer
    }
  }

  joinSeat() {
    this.setState({
      seatOpen: false
    })
  }

  render() {
    let activeClassName = this.props.player.active? 'active' : '';
    let seatOpen = this.state.seatOpen ? 'hide' : '';
    let playing = !this.state.seatOpen ? 'hide' : '';
    if(this.props.player.active && !this.timerId) {
      this.timerId = setInterval(()=>{
        this.setState({
          timeRemaining: this.state.timeRemaining - 1
        })
      }, 1000);
    }
    let timeElapsed = ( this.props.player.timer - this.state.timeRemaining )/this.props.player.timer * 100 ;
    let timerTopWidth, timerRightHeight, timerBottomWidth, timerLeftHeight ;
    if(timeElapsed <= 25) {
      timerTopWidth = timeElapsed * 4 + "%";
      timerRightHeight = 0;
    } else if(timeElapsed > 25 && timeElapsed <= 50 ) {
      timerTopWidth = "100%";
      timerRightHeight = (timeElapsed -25) * 4 + "%";
    } else if (timeElapsed > 50 && timeElapsed <= 75 ) {
      timerTopWidth = "100%";
      timerRightHeight = "100%";
      timerBottomWidth = (timeElapsed - 50) * 4 + "%";
    } else if (timeElapsed > 75 && timeElapsed <= 100 ) {
      timerTopWidth = "100%";
      timerRightHeight = "100%";
      timerBottomWidth = "100%";
      timerLeftHeight = (timeElapsed - 75) * 4 + "%";
    }
    if(timeElapsed == 100) {
      clearInterval(this.timerId);
      this.timerId = undefined;
      timerTopWidth = timerRightHeight = timerBottomWidth = timerLeftHeight = 0;
    }
    return (
      <div className="player">
        <div className={"seat-open "+ playing} onClick={this.joinSeat.bind(this)}>
          <div className="player-container">
            <div className="player-wrapper">
              <div className="player-dp">
                <img src="" />
              </div>
              <div className="open-seat-icon-container">
                <div className="open-seat-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${OpenSeatIcon})`}}></div>
              </div>
              <div className="join">Seat Open
                <div className="join-seat-icon-container">
                  <div className="join-seat-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${JoinSeatIcon})`}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={"sitting-player " + seatOpen}>
          <div className="player-card-wrapper">
            <PlayerCards cards={[{suit: "diams", value: "A"},{suit: "diams", value: "Q"},{suit: "diams", value: 3},{suit: "diams", value: 2}]}/>
          </div>
          <div className={"player-container " + activeClassName}>
            <div className="timer timer-top" style={{width: timerTopWidth}}></div>
            <div className="timer timer-right" style={{height: timerRightHeight}}></div>
            <div className="timer timer-bottom" style={{width: timerBottomWidth}}></div>
            <div className="timer timer-left" style={{height: timerLeftHeight}}></div>
            <div className="player-wrapper">
              <div className="player-dp">
                <img src="" />
              </div>
              <div className="player-name">{this.props.player.name}</div>
              <div className="player-color-container">
                <div className="color-dot">
                  
                </div>
              </div>
              <div className="player-money">
                <div className="player-balance">
                  {this.props.player.balance}
                </div>
                <div className="player-bb">
                  BB <span className="bb-value"> {this.props.player.bbValue} </span>
                </div>
              </div>
              <div>
                
              </div>
              <div className="player-game-style">
                <div className="hands-played"></div>
                <div className="raised"></div>
              </div>
            </div>
          </div>  
        </div>
        
      </div>
    );
  }
}
