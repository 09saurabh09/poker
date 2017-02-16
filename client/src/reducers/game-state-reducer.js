import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
  runningGames: [],
  gameData: {}
};

const gameStateReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.GET_GAMESTATE_SUCCESS:
      return Object.assign({}, state, { gameData: Object.assign({}, state.gameData, {
      	[action.gameState.id]: action.gameState
      }) });
  }

  return state;

}

export default gameStateReducer;
