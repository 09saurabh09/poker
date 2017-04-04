import axios from 'axios';
import utils from '../utils/utils';
import { authenticateUserSuccess, signupUserSuccess, ListMyTablesSuccess, UserInfoSuccess, GameHistorySuccess } from '../actions/user-actions';
import { connectUnauthorizedSocket, connectAuthorizedSocket } from '../actions/socket-actions';

/**
 * Authenticate user login
 */

export function login(userName, password) {
  return dispatch => {
    return axios.post(utils.getAuthenticateUserUrl(), {
      user: {userName, password}
    })
    .then(response => {
      dispatch(connectAuthorizedSocket(response.data.data.token));
      dispatch(authenticateUserSuccess(response.data.data));
      return response;
    });
  }
}

/**
 * User Sign up
 */

export function signup(user) {
  return dispatch => {
    return axios.post(utils.getPublicUserUrl(), {
      user
    })
    .then(response => {
      dispatch(connectAuthorizedSocket(response.data.data.token));
      dispatch(authenticateUserSuccess(response.data.data));
      return response;
    });
  }
} 

/**
  * User info
  */

export function getUserInfo(responseGroup) {
  return dispatch => {
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
      let userInfo = response && response.data && response.data.data;
      let storedUserDataItem = localStorage.getItem('userData')
      let storedUserData = null;
      try {
        storedUserData = JSON.parse(storedUserDataItem)
      } catch(e) {
        storedUserData = null;
      }
      let oldUserData = storedUserData && storedUserData[userInfo.id];
      let resultUserData = oldUserData && Object.assign({}, userInfo, oldUserData) || userInfo;
      dispatch(UserInfoSuccess(resultUserData));
      return response;
    });
  }
} 


export function getMyTables() {
  return dispatch => {
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
}

export function getGameHistory(dispatch, tableId) {
  let token = localStorage.getItem('userToken');
  if(!token) {
    return;
  }
  return axios({
    method: 'get',
    url: utils.getGameHistoryUrl(tableId),
    headers: {
        'X-Access-Token' : token
      }
    })
    .then(response => {
      dispatch(GameHistorySuccess(response.data && response.data.data));
      return response;
    });
}

export function updateUserInfo(data, userData) {
  let token = localStorage.getItem('userToken');
  if(!token) {
    return;
  }
  return axios({
    method: 'PUT',
    url: utils.getUserUrl(),
    headers: {
        'X-Access-Token' : token
      },
    data
    })
    .then(response => {
      localStorage.setItem('userData', JSON.stringify(Object.assign({}, {[userData.id]: userData})))
      return response;
    });
}