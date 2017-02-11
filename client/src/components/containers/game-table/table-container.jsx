import React from 'react';
import { connect } from 'react-redux';
import * as gameStateApi from '../../../api/game-state-api';
import store from '../../../store';

import TopNavContainer from '../top-navigation/top-navigation';
import GameTable from '../../views/game-table/game-table';
import io from 'socket.io-client';

const socket = io.connect(`${location.protocol}`);
/*
class TableContainer extends React.Component{

  componentDidMount() {
    let tableId = this.props.params.id;
    gameStateApi.getGameState(tableId);
  }

  render() {
    debugger;
    return (
      <div className="table-container">
        <TopNavContainer runningGames={this.props.runningGames} socket={socket}/>
        <GameTable gameData={this.props.gameData} socket={socket}/>
      </div>
    );
  }
}

export default connect(
  (state)=>{
    return {
      runningGames : state.gameState.runningGames,
      gameData: state.gameState.gameData
    }
  }
)(TableContainer);*/

const TableContainer = React.createClass({

  componentDidMount: function() {
    let tableId = this.props.params.id;
    gameStateApi.getGameState(tableId);
  },

  render: function() {
    debugger;
    return (
      <div className="table-container">
        <TopNavContainer runningGames={this.props.runningGames} socket={socket}/>
        <GameTable gameData={this.props.gameData} socket={socket}/>
      </div>
    );
  }

});

const mapStateToProps = function(store) {
  return {
    runningGames : store.gameState.runningGames,
    gameData: store.gameState.gameData
  };
};

export default connect(mapStateToProps)(TableContainer);




