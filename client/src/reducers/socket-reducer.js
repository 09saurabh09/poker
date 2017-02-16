import io from 'socket.io-client';
import * as types from '../actions/action-types';

const initialState = {
  unAuthorizedSocket: null,
  authorizedSocket: null
};

const socketReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.CONNECT_AUTHORIZED_SOCKET:
      return Object.assign({}, state, { authorizedSocket: io.connect('localhost:3100/poker-game-authorized?token=' + action.token) });

	case types.CONNECT_UNAUTHORIZED_SOCKET:
	return Object.assign({}, state, { unAuthorizedSocket: io.connect('localhost:3100/poker-game-unauthorized') });
  }

  return state;

}

export default socketReducer;
