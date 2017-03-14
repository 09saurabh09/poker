import React from 'react';
//import './open-seat.scss';

const BasicUserCard = '../../../../assets/img/game/basic-user-card.svg';
const OpenSeatIcon = '../../../../assets/img/game/open-seat.svg';
const JoinSeatIcon = '../../../../assets/img/game/join-seat.svg';

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
          <img src={BasicUserCard} className="basic-user-card-wrapper icon-wrapper" />
          <div className='player-wrapper'>
            <div className='player-dp'>
              <img src='' />
            </div>
            <div className='open-seat-icon-container'>
              <img className='open-seat-icon-wrapper icon-wrapper' src={OpenSeatIcon} />
            </div>
            <div className='join'>Seat Open
              <div className='join-seat-icon-container'>
                <img className='join-seat-icon-wrapper icon-wrapper' src={JoinSeatIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
