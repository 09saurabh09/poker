import * as types from '../actions/action-types';

export function authenticateUserSuccess(data) {
  return {
    type: types.AUTHENTICATE_USER_SUCCESS,
    user: data
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

export function updateUserCards(data) {
  return {
    type: types.UPDATE_USER_CARDS,
    data
  };
}

export function UserInfoSuccess(userInfo) {
  return {
    type: types.USER_INFO_SUCCESS,
    userInfo
  };
}
