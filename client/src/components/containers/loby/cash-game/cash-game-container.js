import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';
import * as gameTableApi from '../../../../api/game-table-api';
import * as userApi from '../../../../api/user-api';
import { loadSearchLayout } from '../../../../actions/search-layout-actions';
import SearchForm from '../../../views/search-form';

import CashGameTable from '../../../views/poker-table/cash-game'

import CashGameFilterContainer from '../../filter/cash-game/cash-game-filter-container'
import FilterIcon from '../../../../../assets/img/table/svg/filter.svg';

import { connectUnauthorizedSocket, connectAuthorizedSocket } from '../../../../actions/socket-actions';


class CashGameContainer extends React.Component{

  constructor(props) {
    super(props);
  }

  openCashGameFilter = () => {
    document.getElementById('cash-game-filter').style.display = 'block';
  }

  componentWillMount() {
    gameTableApi.getGameTables();
  }

  componentDidMount() {
    this.props.dispatch(connectUnauthorizedSocket());
    this.props.dispatch(connectAuthorizedSocket(localStorage.getItem('userToken')));
  }

  render(props) {
    let tableData = [{
     tableId: 1,
     name: 'Amar',
     blinds: '$441',
     buyIn: '$50/$200',
     players: '2/9',
     action: 'hot',
     join: true
    },
    {
     tableId: 2,
     name: 'Amar',
     blinds: '$441',
     buyIn: '$50/$200',
     players: '2/9',
     action: 'hot',
     join: false
    },
    {
     tableId: 3,
     name: 'Amar',
     blinds: '$441',
     buyIn: '$50/$200',
     players: '2/9',
     action: 'cold',
     join: true
    }];
    return (
      <div>
        <CashGameTable tableContents={this.props.tableData.tables} />
        <div className="filter-icon-container">
          <a onClick={this.openCashGameFilter} className="filter-icon-wrapper">
            <div className="filter-icon">
              <div className="filter-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${FilterIcon})`}}></div>
            </div>
          </a>
        </div>
        <CashGameFilterContainer />
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
