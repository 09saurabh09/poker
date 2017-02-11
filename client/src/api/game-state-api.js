import axios from 'axios';
import store from '../store';
import { getGameStateSuccess } from '../actions/game-state-actions';

/**
 * Get Game State
 */

export function getGameState(tableId) {
  return axios.get('http://localhost:3001/tableId')
    .then(response => {
      store.dispatch(getGameStateSuccess(response.data));
      return response;
    });
}

