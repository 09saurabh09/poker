import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
  gameData: {}
};

const gameStateReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.GET_GAMESTATE_SUCCESS:
      let tableId = action.gameStateObject.tableId || Object.keys(action.gameStateObject)[0];
      let oldGameData = state.gameData;
      let oldGameState1 = oldGameData[tableId];
      let newGameState11 = Object.assign({}, oldGameState1, action.gameStateObject[tableId]);
      let newGameData = Object.assign({}, oldGameData, {[tableId]: newGameState11});
      return Object.assign({}, state, {gameData: newGameData});

    case types.SAVE_GAME_ACTION:
    	let oldGameState = state.gameData[action.payload.tableId];
    	let newGameState = Object.assign({}, oldGameState, {payload: action.payload});
    	let oldGameData1 = state.gameData;
    	let newGameData1 = Object.assign({}, oldGameData1, {[action.payload.tableId]: newGameState});
    	return Object.assign({}, state, {gameData: newGameData1});
    case types.REMOVE_GAME_ACTION: 
      let oldGameState2 = state.gameData[action.payload.tableId];
      let newGameState2 = Object.assign({}, oldGameState2);
      delete newGameState2.payload;
      let oldGameData2 = state.gameData;
      let newGameData2 = Object.assign({}, oldGameData2, {[action.payload.tableId]: newGameState2});
      return Object.assign({}, state, {gameData: newGameData2});
  }

  return state;

}

export default gameStateReducer;
