import React from 'react';
import { Link } from 'react-router';

import utils from '../../../utils/utils';
//import './top-navigation.scss';
import MoneyContainer from '../../views/money-container/money-container.jsx';
import PlayerCards from '../../views/player-cards/player-cards.jsx';
import TableSettings from '../../views/table-settings/table-settings.jsx';

import * as userApi from '../../../api/user-api';

export default class TopNavContainer extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="top-nav-container">
        <div id="top-drawer">
          <div className="nav-dropdown">
            <div className="bottom-row">
              <div className="bottom-row-detail">
                <Link to="/cash-game" className="loby-link">
                  <div className="left-arrow">LOBBY</div>
                </Link>
                <div className="playing-tables">
                  {this.props.myTables.map((table, index)=>
                    <div key={index} className={table.id == this.props.tableId ? 'active play-card' : 'play-card'} >
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
                <div className="setting-icon-container" onClick={utils.openModal.bind(this, 'table-settings')}>
                  <img className="setting-icon-wrapper icon-wrapper" src="../../../../assets/img/game/setting.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <TableSettings onSet={()=>{}} userData={this.props.userData} dispatch={this.props.dispatch}/>
      </div>
    );
  }
}
