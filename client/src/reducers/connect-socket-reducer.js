import io from 'socket.io-client';
import * as types from '../actions/action-types';

import utils from '../utils/utils';

const initialState = {
  unAuthorizedSocket: null,
  authorizedSocket: null,
  currentSocket: null
};

const connectSocketReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.CONNECT_AUTHORIZED_SOCKET:
      if(action.token) {
        return Object.assign({}, state, { 
          authorizedSocket: io.connect(utils.getAuthorizedSocketNameSpaceUrl(action.token)),
          currentSocket: io.connect(utils.getAuthorizedSocketNameSpaceUrl(action.token))

        });
      }
      break;
    case types.CONNECT_UNAUTHORIZED_SOCKET:
      return Object.assign({}, state, { 
        unAuthorizedSocket: io.connect(utils.getUnauthorizedSocketNameSpaceUrl()),
        currentSocket: io.connect(utils.getUnauthorizedSocketNameSpaceUrl())
      });

  }

  return state;

}

export default connectSocketReducer;
