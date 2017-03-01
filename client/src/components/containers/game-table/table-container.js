import React from 'react';
import { connect } from 'react-redux';
import * as gameStateApi from '../../../api/game-state-api';
import * as userApi from '../../../api/user-api';

import { updateUserCards } from '../../../actions/user-actions';
import TopNavContainer from '../top-navigation/top-navigation';
import GameTable from '../../views/game-table/game-table.jsx';
import { connectUnauthorizedSocket, connectAuthorizedSocket } from '../../../actions/socket-actions';

class TableContainer extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      gameData: this.props.gameData || {}
    }
  }

  componentWillMount() {
    
  }


  componentDidMount() {
    let { socket, dispatch, params } = this.props;
    let tableId = params.id;
    // call apis
    gameStateApi.getGameState(dispatch, tableId);
    userApi.getMyTables(dispatch, tableId);
    // connect to socket if not already connected
    !socket.unAuthorizedSocket && dispatch(connectUnauthorizedSocket());
    let userToken = localStorage.getItem('userToken');
    if(!socket.authorizedSocket && userToken) {
      dispatch(connectAuthorizedSocket(userToken));
    }
    //if already connected or the connection is in process
    this.socketOnConnect(socket.unAuthorizedSocket, tableId);
    this.socketOnConnect(socket.authorizedSocket, tableId);
  }

  componentWillReceiveProps(nextProps, nextState) {
    let tableId = nextProps.params.id; 
    let oldGameState = nextProps.gameData[tableId];
    if(!oldGameState) {
      return;
    }
    let newGameState = this.addCardsToPlayer(oldGameState, nextProps.userCards[tableId]);
    this.setState({
      gameData: {[tableId]: newGameState}
    })
  }

  componentDidUpdate(prevProps, prevState) {
    let { socket, dispatch, params } = prevProps;
    let tableId = params.id;
    let {unAuthorizedSocket, authorizedSocket} = this.props.socket;
    // in case the user reload page or logs in before join seat
    if(!socket.authorizedSocket && authorizedSocket) {
      this.socketOnConnect(authorizedSocket, tableId);   
    }
    // in case the user reload page
    if(!socket.unAuthorizedSocket && unAuthorizedSocket) {
      this.socketOnConnect(unAuthorizedSocket, tableId);
    }
    if(this.props.params.id != prevProps.params.id) {
      gameStateApi.getGameState(dispatch, this.props.params.id);
    }
  }

  addCardsToPlayer(gameState, cards) {
    if(!gameState) {
      return;
    }
    let newGameState = gameState;
    let players = newGameState.players;
    players.forEach((player)=>{
      if(player && (player.id == this.props.userData.id)) {
        player.cards = cards;
      }
    })
    return newGameState;
  }

  performSocketActions(socket, tableId) {
    socket.emit('game-subscribe-gameState', { tableId: tableId });

    socket.on('player-joined', (data)=>{
      console.log( socket.nsp, ' Player joined', data);
      let newGameState = this.addCardsToPlayer(data, this.props.userCards[tableId]);
      this.setState({
        gameData: {[data.tableId]: newGameState}
      })
    });

    socket.on('turn-completed', (data)=>{
      console.log( socket.nsp,' turn-completed', data);
      let newGameState = this.addCardsToPlayer(data, this.props.userCards[tableId]);
      this.setState({
        gameData: {[data.tableId]: newGameState}
      })
    });

    socket.on('game-started', (data)=>{
      console.log(socket.nsp, 'game started cards ', data);
      let newGameState = this.addCardsToPlayer(this.state.gameData[data.tableId], data.cards);
      this.props.dispatch(updateUserCards({tableId: data.tableId, cards: data.cards}))
      if(tableId == data.tableId) {
        this.setState({
          gameData: {[data.tableId]: newGameState}
        })
      }
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
        <TopNavContainer myTables={this.props.myTables} userData={this.props.userData} tableId={this.props.params.id}
          unAuthorizedSocket={this.props.unAuthorizedSocket} authorizedSocket={this.props.socket.authorizedSocket} />
        <GameTable tableId={this.props.params.id} gameData={this.state.gameData} userData={this.props.userData}
        unAuthorizedSocket={this.props.unAuthorizedSocket} authorizedSocket={this.props.socket.authorizedSocket} dispatch={this.props.dispatch}/>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    userData: state.userState.userData,
    userCards: state.userState.userCards,
    socket: state.socket,
    myTables : state.userState.myTables,
    gameData: state.gameState.gameData
  };
};

export default connect(mapStateToProps)(TableContainer);
