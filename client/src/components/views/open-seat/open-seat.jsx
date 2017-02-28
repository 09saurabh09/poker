import React from 'react';
//import './open-seat.scss';

import BasicUserCard from '../../../../assets/img/game/basic-user-card.svg';
import OpenSeatIcon from '../../../../assets/img/game/open-seat.svg';
import JoinSeatIcon from '../../../../assets/img/game/join-seat.svg';

export default class OpenSeat extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount(){

  }

  componentDidUpdate(){

  }

  componentWillReceiveProps(nextProps, nextState){

  }

  componentWillUpdate(nextProps, nextState) {
    
  }


  render() {
    return (
      <div className="seat-open" onClick={this.props.onJoinSeat.bind(this)}>
        <div className='player-container'>
          <div className='player-wrapper'>
            <div className='player-dp'>
              <img src='' />
            </div>
            <div className='open-seat-icon-container'>
              <div className='open-seat-icon-wrapper icon-wrapper' style={{backgroundImage: `url(${OpenSeatIcon})`}}></div>
            </div>
            <div className='join'>Seat Open
              <div className='join-seat-icon-container'>
                <div className='join-seat-icon-wrapper icon-wrapper' style={{backgroundImage: `url(${JoinSeatIcon})`}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
