import React from 'react';
import { connect } from 'react-redux';
import * as gameStateApi from '../../../api/game-state-api';
import store from '../../../store';

import TopNavContainer from '../top-navigation/top-navigation';
import GameTable from '../../views/game-table/game-table';
import io from 'socket.io-client';

const unAuthorizedSocket = io.connect('localhost:3100/poker-game-unauthorized');

class TableContainer extends React.Component{

  componentWillMount() {
    let tableId = this.props.params.id;
    
  }

  componentDidMount() {
    let tableId = this.props.params.id;
    gameStateApi.getGameState(tableId);
    unAuthorizedSocket.emit('game-subscribe-gameState', {tableUniqueId: tableId} ); 
    unAuthorizedSocket.on('player-joined', (msg)=>{
      console.log(msg);
    } );
  }


  render() {
    return (
      <div className="table-container">
        <TopNavContainer runningGames={this.props.runningGames} unAuthorizedSocket={unAuthorizedSocket}/>
        <GameTable tableId={this.props.params.id} gameData={this.props.gameData} unAuthorizedSocket={unAuthorizedSocket}/>
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    runningGames : store.gameState.runningGames,
    gameData: store.gameState.gameData
  };
};

export default connect(mapStateToProps)(TableContainer);
