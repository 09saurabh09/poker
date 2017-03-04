import React from 'react';
//import './open-seat.scss';

import BasicUserCard from '../../../../assets/img/game/basic-user-card.svg';
import OpenSeatIcon from '../../../../assets/img/game/open-seat.svg';
import JoinSeatIcon from '../../../../assets/img/game/join-seat.svg';

import Svg from '../svg/svg.jsx';

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
              <Svg className='open-seat-icon-wrapper icon-wrapper' markup={OpenSeatIcon} />
            </div>
            <div className='join'>Seat Open
              <div className='join-seat-icon-container'>
                <Svg className='join-seat-icon-wrapper icon-wrapper' markup={JoinSeatIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
