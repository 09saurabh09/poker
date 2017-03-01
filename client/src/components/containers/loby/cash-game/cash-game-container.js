import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';
import * as gameTableApi from '../../../../api/game-table-api';

import CashGameTable from '../../../views/poker-table/cash-game.jsx'

import CashGameFilter from '../../../views/filter/cash-game.jsx'
import FilterIcon from '../../../../../assets/img/table/svg/filter.svg';
import Svg from '../../../views/svg/svg.jsx';

import { connectUnauthorizedSocket, connectAuthorizedSocket } from '../../../../actions/socket-actions';


class CashGameContainer extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      filterData: this.props.tableData.tables
    }
  }

  openCashGameFilter() {
    document.getElementById('cash-game-filter').style.display = 'block';
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({
      filterData: nextProps.tableData.tables
    })
  }

  componentWillMount() {
    
  }

  componentDidMount() {
    let { dispatch } = this.props;
    dispatch(connectUnauthorizedSocket());
    let userToken = localStorage.getItem('userToken');
    if(userToken) {
      gameTableApi.getGameTables(dispatch, userToken);
      dispatch(connectAuthorizedSocket(userToken));
    } else {
      gameTableApi.getPublicGameTables(dispatch);
    }
  }

  updateTableContent(filterData) {
    this.setState({
      filterData
    })
    var modal = document.getElementById('cash-game-filter');
    modal.style.display = 'none';
  }

  render() {
    return (
      <div>
        <CashGameTable tableContents={this.state.filterData} />
        <div className="filter-icon-container">
          <a onClick={this.openCashGameFilter.bind(this)} className="filter-icon-wrapper">
            <div className="filter-icon">
              <Svg className="filter-icon-wrapper icon-wrapper" markup={FilterIcon} />
            </div>
          </a>
        </div>
        <CashGameFilter tableContents={this.props.tableData.tables} applyFilter={this.updateTableContent.bind(this)}/>
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
