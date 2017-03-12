import * as types from '../actions/action-types';

export function getGameStateSuccess(gameStateObject) {
  return {
    type: types.GET_GAMESTATE_SUCCESS,
    gameStateObject
  };
}

export function saveGameAction(payload) {
	return {
    type: types.SAVE_GAME_ACTION,
    payload
  };
}

export function removeGameAction(payload) {
	return {
    type: types.REMOVE_GAME_ACTION,
    payload
  };
}