import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
  runningGames: [],
  gameData: {}
};

const gameStateReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.GET_GAMESTATE_SUCCESS:
      let oldGameData = state.gameData;
      let newGameData = Object.assign({}, oldGameData, action.gameStateObject);
      return Object.assign({}, state, {gameData: newGameData});
  }

  return state;

}

export default gameStateReducer;
