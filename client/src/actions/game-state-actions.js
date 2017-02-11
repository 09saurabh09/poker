import * as types from '../actions/action-types';

export function getGameStateSuccess(gameState) {
  return {
    type: types.GET_GAMESTATE_SUCCESS,
    gameState
  };
}
