import React from 'react';
import { connect } from 'react-redux';
import * as gameStateApi from '../../../api/game-state-api';
import store from '../../../store';

import TopNavContainer from '../top-navigation/top-navigation.jsx';
import GameTable from '../../views/game-table/game-table.jsx';

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
      console.log('unAuthorizedSocket' + data);
    });
    socket.unAuthorizedSocket.on('turn-completed', (data)=>{
      console.log(data);
    });
    socket.authorizedSocket && socket.authorizedSocket.on('game-started', (data)=>{
      console.log(data);
    });
  }

  componentWillReceiveProps(nextProps, nextState) {
    let { socket, dispatch, params } = nextProps;
    let tableId = params.id;
    if(socket.authorizedSocket && !this.props.socket.authorizedSocket) {
      socket.authorizedSocket.emit('game-subscribe-gameState', { tableUniqueId: tableId });
      socket.authorizedSocket.on('game-started', (data)=>{
        console.log(data);
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
