import * as types from '../actions/action-types';

const initialState = {
  tables: []
};

const gameTableReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.GET_ALL_GAMETABLES_SUCCESS:
      return Object.assign({}, state, { tables: action.tables });
  }

  return state;

}

export default gameTableReducer;
