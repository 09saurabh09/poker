import * as types from '../actions/action-types';

export function connectAuthorizedSocket(token) {
  return {
    type: types.CONNECT_AUTHORIZED_SOCKET,
    token
  };
}

export function connectUnauthorizedSocket(data) {
  return {
    type: types.CONNECT_UNAUTHORIZED_SOCKET,
    data
  };
}
