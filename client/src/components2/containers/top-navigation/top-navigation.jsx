import React from 'react';
import { Link } from 'react-router';
import MoneyContainer from '../../views/money-container/money-container.jsx';
import PlayerCards from '../../views/player-cards/player-cards.jsx';
if(process.env.WEBPACK) {
  require( './top-navigation.scss' );
  var PlayIcon = require( '../../../../assets/img/table/svg/yoga-play.svg' );
  
}

export default class TopNavContainer extends React.Component{

  constructor(props) {
    super(props);
  }

  render(props) {
    return (
      <div className="top-nav-container">
        <div id="top-drawer">
          <div className="nav-dropdown">
            <div className="top-row">
              <div className="user-container">
                <div className="user-details">
                  <div className="play-icon nav-link">
                    <div className="play-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${PlayIcon})`}}></div>
                  </div>
                  <div id="dp-container" className="profile-photo">
                    <img id="dp" className="photo" src="http://pnge.org/wp-content/uploads/2016/12/1480662458_318_images.jpg"/>
                  </div>
                  <div className="name-balance">
                    <div className="user-name">
                      Adeline Daniel
                    </div>
                    <div className="balance">
                      Balance : $123
                    </div>
                  </div>
                </div>
              </div>
              <div className="money-wrapper">
                <MoneyContainer />
              </div>
            </div>
            <div className="bottom-row">
              <div className="bottom-row-detail">
                <Link to="/cash-game" >
                  <div className="left-arrow">LOBBY</div>
                </Link>
                <div className="playing-tables">
                  {this.props.runningGames.map((game, index)=>
                    <div key={index} className={game.active? 'active play-card' : 'play-card'}>
                      <PlayerCards cards={game.cards}/>
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
