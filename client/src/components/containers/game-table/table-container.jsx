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
    this.socketOnConnect(socket.unAuthorizedSocket, tableId);
    this.socketOnConnect(socket.authorizedSocket, tableId);
  }

  componentWillReceiveProps(nextProps, nextState) {
    
  }

  componentDidUpdate(prevProps, prevState) {
    let { socket, dispatch, params } = prevProps;
    let tableId = params.id;
    let authorizedSocket = this.props.socket.authorizedSocket;

    if(!socket.authorizedSocket && authorizedSocket) {
      this.socketOnConnect(authorizedSocket, tableId);   
    }
    if(this.props.params.id != prevProps.params.id) {
      gameStateApi.getGameState(this.props.params.id);
    }
  }

  performSocketActions(socket, tableId) {
    socket.emit('game-subscribe-gameState', { tableId: tableId });

    socket.on('player-joined', (data)=>{
      console.log( socket.nsp, ' Player joined', data);
    });
    socket.on('turn-completed', (data)=>{
      console.log( socket.nsp,' turn-completed', data);
    });
    socket.on('game-started', (data)=>{
      console.log(socket.nsp, 'game started data ', data);
    });
  }

  socketOnConnect(socket, tableId) {
    if(!socket) {
      return;
    }
    if(socket.connected) {
      this.performSocketActions(socket, tableId);
    } else {
      socket.on('connection', ()=>{
        this.performSocketActions(socket, tableId);
      })
    }    
  }

  render() {
    return (
      <div className="table-container">
        <TopNavContainer runningGames={this.props.runningGames} 
          unAuthorizedSocket={this.props.unAuthorizedSocket} authorizedSocket={this.props.socket.authorizedSocket} />
        <GameTable tableId={this.props.params.id} gameData={this.props.gameData} userData={this.props.userData}
        unAuthorizedSocket={this.props.unAuthorizedSocket} authorizedSocket={this.props.socket.authorizedSocket}/>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    userData: state.userState.userData,
    socket: state.socket,
    runningGames : state.gameState.runningGames,
    gameData: state.gameState.gameData
  };
};

export default connect(mapStateToProps)(TableContainer);
