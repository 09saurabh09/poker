import * as types from '../actions/action-types';

export function authenticateUserSuccess(data) {
  return {
    type: types.AUTHENTICATE_USER_SUCCESS,
    userToken: data.token
  };
}

export function signupUserSuccess(data) {
  return {
    type: types.SIGNUP_USER_SUCCESS,
    code: data.code
  };
}



export function getUsersSuccess(users) {
  return {
    type: types.GET_USERS_SUCCESS,
    users
  };
}

export function deleteUserSuccess(userId) {
  return {
    type: types.DELETE_USER_SUCCESS,
    userId
  };
}

export function UserInfoSuccess(userInfo) {
  return {
    type: types.USER_INFO_SUCCESS,
    userInfo
  };
}
