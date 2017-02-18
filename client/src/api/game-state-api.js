import axios from 'axios';
import store from '../store';
import utils from '../utils/utils';
import { getGameStateSuccess } from '../actions/game-state-actions';

/**
 * Get Game State
 */

export function getGameState(tableId) {
  return axios.get(utils.getTableDetailsUrl(tableId))
    .then(response => {
      let gameState = response.data.data.gameState;
      store.dispatch(getGameStateSuccess({[response.data.data.id]: gameState}));
      return response;
    });
}

