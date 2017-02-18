import axios from 'axios';
import store from '../store';
import utils from '../utils/utils';
import { authenticateUserSuccess, signupUserSuccess, getUsersSuccess, deleteUserSuccess, userProfileSuccess } from '../actions/user-actions';
import { connectUnauthorizedSocket, connectAuthorizedSocket } from '../actions/socket-actions';

/**
 * Authenticate user login
 */

export function login(email, password) {
  return axios.post(utils.getAuthenticateUserUrl(), {
    user: {email, password}
  })
    .then(response => {
      store.dispatch(connectAuthorizedSocket(response.data.data.token));
      store.dispatch(authenticateUserSuccess(response.data));
      return response;
    });
}

/**
 * User Sign up
 */

export function signup(email, password) {
  return axios.post(utils.getPublicUserUrl(), {
    user: {email, password}
  })
    .then(response => {
      store.dispatch(signupUserSuccess(response.data));
      return response;
    });
} 
