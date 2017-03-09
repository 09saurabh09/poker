import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
  gameData: {}
};

const gameStateReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.GET_GAMESTATE_SUCCESS:
      let oldGameData = state.gameData;
      let newGameData = Object.assign({}, oldGameData, action.gameStateObject);
      return Object.assign({}, state, {gameData: newGameData});

    case types.SAVE_GAME_ACTION:
    	let oldGameState = state.gameData[action.payload.tableId];
      	let newGameState = Object.assign({}, oldGameState, {payload: action.payload});
      	let oldGameData1 = state.gameData;
      	let newGameData1 = Object.assign({}, oldGameData1, {[action.payload.tableId]: newGameState});

      	return Object.assign({}, state, {gameData: newGameData1});		
  }

  return state;

}

export default gameStateReducer;
