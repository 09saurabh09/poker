import axios from 'axios';
import utils from '../utils/utils';
import { authenticateUserSuccess, signupUserSuccess, ListMyTablesSuccess, UserInfoSuccess } from '../actions/user-actions';
import { connectUnauthorizedSocket, connectAuthorizedSocket } from '../actions/socket-actions';

/**
 * Authenticate user login
 */

export function login(dispatch, email, password) {
  return axios.post(utils.getAuthenticateUserUrl(), {
    user: {email, password}
  })
    .then(response => {
      dispatch(connectAuthorizedSocket(response.data.data.token));
      dispatch(authenticateUserSuccess(response.data.data));
      return response;
    });
}

/**
 * User Sign up
 */

export function signup(dispatch, user) {
  return axios.post(utils.getPublicUserUrl(), {
    user
  })
    .then(response => {
      dispatch(signupUserSuccess(response.data));
      return response;
    });
} 

/**
  * User info
  */

export function getUserInfo(dispatch, responseGroup) {
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
      dispatch(UserInfoSuccess(response.data));
      return response;
    });
} 


export function getMyTables(dispatch) {
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
      dispatch(ListMyTablesSuccess(response.data && response.data.data));
      return response;
    });
}
