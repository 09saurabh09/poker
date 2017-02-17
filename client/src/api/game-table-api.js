import axios from 'axios';
import store from '../store';
import utils from '../utils/utils';
import { getAllGameTablesSuccess } from '../actions/game-table-actions';

/**
 * Get Game State for Authenticated user
 */

export function getGameTables(token) {
  return axios({
    method: 'get',
    url: `http://${window.location.hostname}:7100/api/game/tables`,
    headers: {
        'X-Access-Token' : token
      }
    })
  .then(response => {
    store.dispatch(getAllGameTablesSuccess(response.data && response.data.data));
    return response;
  });
}

/**
 * Get Game State for Unauthenticated user
 */

export function getPublicGameTables() {
  return axios.get(`http://${window.location.hostname}:7100/api/public/game/tables`)
    .then(response => {
      store.dispatch(getAllGameTablesSuccess(response.data && response.data.data));
      return response;
    });
}

