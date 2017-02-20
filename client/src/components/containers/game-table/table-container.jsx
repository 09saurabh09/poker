import React from 'react';
import { connect } from 'react-redux';
import * as gameStateApi from '../../../api/game-state-api';
import store from '../../../store';

import TopNavContainer from '../top-navigation/top-navigation';
import GameTable from '../../views/game-table/game-table';

class TableContainer extends React.Component{

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    
  }

  componentDidMount() {
    let { socket, dispatch, params } = this.props;
    let tableId = params.id;
    gameStateApi.getGameState(tableId);
    socket.unAuthorizedSocket.emit('game-subscribe-gameState', { tableUniqueId: tableId });
    socket.unAuthorizedSocket.on('player-joined', (data)=>{
      console.log('unAuthorizedSocket Player joined', data);
    });
    socket.authorizedSocket && socket.authorizedSocket.on('player-joined', (data)=>{
      console.log('authorizedSocket Player joined', data);
    });
    socket.unAuthorizedSocket.on('turn-completed', (data)=>{
      console.log('unauthorizedSocket turn-completed', data);
    });
    socket.authorizedSocket && socket.authorizedSocket.on('turn-completed', (data)=>{
      console.log('authorizedSocket turn-completed', data);
    });
    socket.authorizedSocket && socket.authorizedSocket.on('game-started', (data)=>{
      console.log('game started data ', data);
    });
  }

  componentWillReceiveProps(nextProps, nextState) {
    let { socket, dispatch, params } = nextProps;
    let tableId = params.id;
    if(socket.authorizedSocket && !this.props.socket.authorizedSocket) {
      socket.authorizedSocket.emit('game-subscribe-gameState', { tableUniqueId: tableId });
      socket.authorizedSocket.on('player-joined', (data)=>{
        console.log('authorizedSocket Player joined', data);
      });
      socket.authorizedSocket && socket.authorizedSocket.on('turn-completed', (data)=>{
        console.log('authorizedSocket turn-completed', data);
      });
      socket.authorizedSocket.on('game-started', (data)=>{
        console.log('game started data ', data);
      });
    }
  }


  render() {
    return (
      <div className="table-container">
        <TopNavContainer runningGames={this.props.runningGames} 
          unAuthorizedSocket={this.props.unAuthorizedSocket} authorizedSocket={this.props.socket.authorizedSocket} />
        <GameTable tableId={this.props.params.id} gameData={this.props.gameData} userData={{name: 'Amar Nath Saha', id: 1}}
        unAuthorizedSocket={this.props.unAuthorizedSocket} authorizedSocket={this.props.socket.authorizedSocket}/>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    userData: state.userData,
    socket: state.socket,
    runningGames : state.gameState.runningGames,
    gameData: state.gameState.gameData
  };
};

export default connect(mapStateToProps)(TableContainer);
