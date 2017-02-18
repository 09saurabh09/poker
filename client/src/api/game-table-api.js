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
    url: utils.getGameTableUrl(),
    headers: {
        'X-Access-Token' : token
      }
    })
  .then(response => {
    store.dispatch(getAllGameTablesSuccess(response.data && response.data.data));
    return response;
  }, result => {
    if(result.response.status == 401 || result.response.status == 403 ) {
      localStorage.removeItem('userToken');
      return getPublicGameTables();
    }
  });
}

/**
 * Get Game State for Unauthenticated user
 */

export function getPublicGameTables() {
  return axios.get(utils.getPublicGameTableUrl())
    .then(response => {
      store.dispatch(getAllGameTablesSuccess(response.data && response.data.data));
      return response;
    });
}

