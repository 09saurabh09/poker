import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
  gameState: {}
};

const gameStateReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.GET_GAMESTATE_SUCCESS:
      return Object.assign({}, state, { gameState: action.gameState });
  }

  return state;

}

export default gameStateReducer;
