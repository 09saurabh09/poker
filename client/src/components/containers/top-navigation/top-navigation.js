import React from 'react';
import { Link } from 'react-router';

//import './top-navigation.scss';
import PlayIcon from '../../../../assets/img/table/svg/yoga-play.svg';
import MoneyContainer from '../../views/money-container/money-container.jsx';
import PlayerCards from '../../views/player-cards/player-cards.jsx';

import Svg from '../../views/svg/svg.jsx';

export default class TopNavContainer extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="top-nav-container">
        <div id="top-drawer">
          <div className="nav-dropdown">
            {/*<div className="top-row">
              <div className="user-container">
                <div className="user-details">
                  <div className="play-icon nav-link">
                    <Svg className="play-icon-wrapper icon-wrapper" markup={PlayIcon} />
                  </div>
                  <div id="dp-container" className="profile-photo">
                    <img id="dp" className="photo" src=""/>
                  </div>
                  <div className="name-balance">
                    <div className="user-name">
                      {this.props.userData.name}
                    </div>
                    <div className="balance">
                      {`Balance : ${this.props.userData.currentBalance}`}
                    </div>
                  </div>
                </div>
              </div>
              <div className="money-wrapper">
                <MoneyContainer />
              </div>
            </div>*/}
            <div className="bottom-row">
              <div className="bottom-row-detail">
                <Link to="/cash-game" >
                  <div className="left-arrow">LOBBY</div>
                </Link>
                <div className="playing-tables">
                  {this.props.myTables.map((table, index)=>
                    <div key={index} className={table.id == this.props.tableId ? 'active play-card' : 'play-card'}>
                       <Link to={`/cash-game/play/${table.id}`} className="table-link">
                        <PlayerCards cards={table.userCards}/>
                      </Link>  
                    </div>
                    )}
                  <div className="play-card plus-game">
                    <Link to="/cash-game" className="full-width-height">
                      <div className="plus-icon"></div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
