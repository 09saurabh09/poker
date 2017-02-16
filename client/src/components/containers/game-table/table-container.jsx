import React from 'react';
import { connect } from 'react-redux';
import * as gameStateApi from '../../../api/game-state-api';
import store from '../../../store';

import TopNavContainer from '../top-navigation/top-navigation';
import GameTable from '../../views/game-table/game-table';
//import io from 'socket.io-client';

//const unAuthorizedSocket = io.connect('localhost:3100/poker-game-unauthorized');

class TableContainer extends React.Component{

  componentWillMount() {
    let tableId = this.props.params.id;
    
  }

  componentDidMount() {
    let tableId = this.props.params.id;
    gameStateApi.getGameState(tableId);
    this.props.socket.unAuthorizedSocket.emit('game-subscribe-gameState', {tableUniqueId: tableId} ); 
    this.props.socket.unAuthorizedSocket.on('player-joined', (msg)=>{
      console.log(msg);
    } );
  }


  render() {
    return (
      <div className="table-container">
        <TopNavContainer runningGames={this.props.runningGames} 
          unAuthorizedSocket={this.props.unAuthorizedSocket} authorizedSocket={this.props.socket.authorizedSocket} />
        <GameTable tableId={this.props.params.id} gameData={this.props.gameData} 
        unAuthorizedSocket={this.props.unAuthorizedSocket} authorizedSocket={this.props.socket.authorizedSocket}/>
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    socket: store.socket,
    runningGames : store.gameState.runningGames,
    gameData: store.gameState.gameData
  };
};

export default connect(mapStateToProps)(TableContainer);
