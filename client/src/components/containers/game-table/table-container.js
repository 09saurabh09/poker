import React from 'react';
import { Router, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as gameStateApi from '../../../api/game-state-api';
import * as userApi from '../../../api/user-api';

import { updateUserCards } from '../../../actions/user-actions';
import TopNavContainer from '../top-navigation/top-navigation';
import GameTable from '../../views/game-table/game-table.jsx';
import { connectUnauthorizedSocket, connectAuthorizedSocket } from '../../../actions/socket-actions';
import { getGameStateSuccess } from '../../../actions/game-state-actions';

class TableContainer extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      gameData : this.props.gameData,
      myTables: this.props.myTables
    }
  }

  componentWillMount() {
    
  }


  componentDidMount() {
    let { socket, dispatch, params } = this.props;
    let tableId = params.id;
    // call apis
    gameStateApi.getGameState(dispatch, tableId);
    dispatch(userApi.getMyTables());
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
    if(nextProps.params.id && nextProps.params.playAction == 'play') {
      let tableId = nextProps.params.id;
      let oldGameState = nextProps.gameData[tableId];
      if(!oldGameState) {
        return;
      }
      let newGameState = this.addCardsToPlayer(oldGameState, nextProps.userCards[tableId], nextProps.userData.id);
      this.setState({
        gameData: newGameState,
        myTables: nextProps.myTables
      })
    } else if(nextProps.params.id && nextProps.params.playAction == 'replay') {
      let counter = 0;
      for(var i = 0 ; i< nextProps.gameHistory.length ; i++) {
        let gameHistories = nextProps.gameHistory[i].GameHistories;
        for(var j = 0; j < gameHistories.length; j++) {
          counter++;
          (function(component, gameData){
            setTimeout(function(){
              console.log(gameData);
              component.setState({
                gameData
              })
            }, 500 * (counter));
          })(this, gameHistories[j].gameState)
        }
      }
    }
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
    let totalGamesRunning = Object.keys(this.props.gameData);
    if(totalGamesRunning.length > 0 && totalGamesRunning.indexOf(this.props.params.id) == -1) {
      gameStateApi.getGameState(dispatch, this.props.params.id);
    }
  }

  addCardsToPlayer(gameState, cards, userId = this.props.userData.id) {
    if(!gameState) {
      return;
    }
    let newGameState = gameState;
    let players = newGameState.players;
    players.forEach((player)=>{
      if(player && (player.id == userId)) {
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
      /*this.setState({
        gameData: {[data.tableId]: newGameState}
      })*/
      this.props.dispatch(getGameStateSuccess({[data.tableId]: newGameState}));
    });

    socket.on('turn-completed', (data)=>{
      console.log( socket.nsp,' turn-completed', data);
      //update timer as soon as we get the new game state
      let newGameState = this.addCardsToPlayer(data, this.props.userCards[tableId]);
      /*this.setState({
        gameData: {[data.tableId]: newGameState}
      })*/
      this.props.dispatch(getGameStateSuccess({[data.tableId]: newGameState}));
    });

    socket.on('game-started', (data)=>{
      console.log(socket.nsp, 'game started cards ', data);
      let newGameState = this.addCardsToPlayer(this.props.gameData[data.tableId], data.cards);
      this.props.dispatch(updateUserCards({tableId: data.tableId, cards: data.cards}))
//      if(tableId == data.tableId) {
        /*this.setState({
          gameData: {[data.tableId]: newGameState}
        })*/
        this.props.dispatch(getGameStateSuccess({[data.tableId]: newGameState}));
//      }
    });
  }

  socketOnConnect(socket, tableId) {
    if(!socket) {
      return;
    }
    if(socket.connected) {
      this.performSocketActions(socket, tableId);
    } else {
      socket.on('connect', ()=>{
        this.performSocketActions(socket, tableId);
      })
    }    
  }

  onReplay() {
    userApi.getGameHistory(this.props.dispatch, this.props.params.id)
    .then(()=>{
        browserHistory.push(`/cash-game/replay/${this.props.params.id}`);
    });
  }

  tableLeave() {
    let { myTables, params } = this.props;
    let currentTableId = parseInt(params.id);
    let nextTableIndex;
    let allTables = myTables.map((table) => {
      return table.id;
    })
    let currentIndex = allTables.indexOf(currentTableId);
    if(allTables.length == 1) {
      nextTableIndex = -1;
    } else if (currentIndex == 0) {
      nextTableIndex = currentIndex + 1;
    } else {
      nextTableIndex = currentIndex - 1;
    }
    if(nextTableIndex == -1) {
      browserHistory.replace(`/cash-game`);
    } else {
      let nextTable = myTables[nextTableIndex].id;
      browserHistory.replace(`/cash-game/play/${nextTable}`);  
    }
    let otherTables = myTables.filter((table) => {
        return table.id != currentTableId;
      });
    this.setState({
      myTables: otherTables
    })
  }

  onSitOut() {
    $('.nav-dropdown').css({'left': 0, 'top': 'auto', 'z-index': 100, 'width': '100%'})
  }

  render() {
    return (
      <div id="table-container">
        <TopNavContainer myTables={this.state.myTables} tableId={this.props.params.id} userData={this.props.userData}
        dispatch={this.props.dispatch}/>
        <GameTable tableId={this.props.params.id} gameData={this.state.gameData} userData={this.props.userData}
        unAuthorizedSocket={this.props.socket.unAuthorizedSocket} authorizedSocket={this.props.socket.authorizedSocket} 
        dispatch={this.props.dispatch} onReplayClick={this.onReplay.bind(this)} tableLeave={this.tableLeave.bind(this)}
        sitOutTable={this.onSitOut.bind(this)}
        />
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
    gameData: state.gameState.gameData,
    gameHistory: state.userState.gameHistory
  };
};

export default connect(mapStateToProps)(TableContainer);
