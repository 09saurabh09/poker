import React from 'react';
import { connect } from 'react-redux';
import * as gameStateApi from '../../../api/game-state-api';
import store from '../../../store';

import TopNavContainer from '../top-navigation/top-navigation';
import GameTable from '../../views/game-table/game-table';

class TableContainer extends React.Component{

  componentWillMount() {
    let tableId = this.props.params.id;
    gameStateApi.getGameState(tableId);
    this.props.socket.unAuthorizedSocket.emit('game-subscribe-gameState', {tableUniqueId: tableId} ); 
    this.props.socket.authorizedSocket.on('player-joined', (msg)=>{
      console.log(msg);
    } );
  }

  componentDidMount() {
    
  }


  render() {
    return (
      <div className="table-container">
        <TopNavContainer runningGames={this.props.runningGames} 
          unAuthorizedSocket={this.props.unAuthorizedSocket} authorizedSocket={this.props.socket.authorizedSocket} />
        <GameTable tableId={this.props.params.id} gameData={this.props.gameData} userData={{id: 1}}
        unAuthorizedSocket={this.props.unAuthorizedSocket} authorizedSocket={this.props.socket.authorizedSocket}/>
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    userData: store.userData,
    socket: store.socket,
    runningGames : store.gameState.runningGames,
    gameData: store.gameState.gameData
  };
};

export default connect(mapStateToProps)(TableContainer);
