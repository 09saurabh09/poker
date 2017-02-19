import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';
import * as gameTableApi from '../../../../api/game-table-api';
import * as userApi from '../../../../api/user-api';
import { loadSearchLayout } from '../../../../actions/search-layout-actions';
import SearchForm from '../../../views/search-form';

import CashGameTable from '../../../views/poker-table/cash-game.jsx'

import CashGameFilter from '../../../views/filter/cash-game.jsx'
if(process.env.WEBPACK) {
  var FilterIcon = require ('../../../../../assets/img/table/svg/filter.svg');
}

import { connectUnauthorizedSocket, connectAuthorizedSocket } from '../../../../actions/socket-actions';


class CashGameContainer extends React.Component{

  constructor(props) {
    super(props);
  }

  openCashGameFilter() {
    document.getElementById('cash-game-filter').style.display = 'block';
  }

  componentWillMount() {
    
  }

  componentDidMount() {
    let { dispatch } = this.props;
    dispatch(connectUnauthorizedSocket());  
    let userToken = localStorage.getItem('userToken');
    if(userToken) {
      gameTableApi.getGameTables(userToken);
      dispatch(connectAuthorizedSocket(userToken));
    } else {
      gameTableApi.getPublicGameTables();
    }
  }

  render(props) {
    return (
      <div>
        <CashGameTable tableContents={this.props.tableData.tables} />
        <div className="filter-icon-container">
          <a onClick={this.openCashGameFilter.bind(this)} className="filter-icon-wrapper">
            <div className="filter-icon">
              <div className="filter-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${FilterIcon})`}}></div>
            </div>
          </a>
        </div>
        <CashGameFilter />
      </div>
    );
  }
}


const mapStateToProps = function(store) {
  return {
    tableData: store.gameTable,
    socket: store.socket,
    userData: store.userData,
    runningGames : store.gameState.runningGames,
    gameData: store.gameState.gameData
  };
};

export default connect(mapStateToProps)(CashGameContainer);
