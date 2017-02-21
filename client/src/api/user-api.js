import axios from 'axios';
import store from '../store';
import utils from '../utils/utils';
import { authenticateUserSuccess, signupUserSuccess, ListMyTablesSuccess, UserInfoSuccess } from '../actions/user-actions';
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

/**
  * User info
  */

export function getUserInfo(responseGroup) {
  let token = localStorage.getItem('userToken');
  if(!token) {
    return;
  }
  return axios({
    method: 'get',
    url: utils.getUserInfoUrl(responseGroup),
    headers: {
        'X-Access-Token' : token
      }
    })
    .then(response => {
      store.dispatch(UserInfoSuccess(response.data));
      return response;
    });
} 


export function getMyTables() {
  let token = localStorage.getItem('userToken');
  if(!token) {
    return;
  }
  return axios({
    method: 'get',
    url: utils.getListMyTablesUrl(),
    headers: {
        'X-Access-Token' : token
      }
    })
    .then(response => {
      store.dispatch(ListMyTablesSuccess(response.data && response.data.data));
      return response;
    });
}
