import * as types from '../actions/action-types';

export function getAllGameTablesSuccess(tables) {
  return {
    type: types.GET_ALL_GAMETABLES_SUCCESS,
    tables
  };
}
