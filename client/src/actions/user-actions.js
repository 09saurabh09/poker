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

export function ListMyTablesSuccess(myTables) {
  return {
    type: types.LIST_MYTABLES_SUCCESS,
    myTables
  };
}
