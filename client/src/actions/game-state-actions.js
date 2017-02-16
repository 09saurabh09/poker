import * as types from '../actions/action-types';

export function getGameStateSuccess(gameStateObject) {
  return {
    type: types.GET_GAMESTATE_SUCCESS,
    gameStateObject
  };
}
