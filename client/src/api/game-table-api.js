import axios from 'axios';
import store from '../store';
import utils from '../utils/utils';
import { getAllGameTablesSuccess } from '../actions/game-table-actions';

/**
 * Get Game State
 */

export function getGameTables() {
  return axios.get(`http://localhost:7100/api/public/game/tables`)
    .then(response => {
      store.dispatch(getAllGameTablesSuccess(response.data && response.data.data));
      return response;
    });

}

