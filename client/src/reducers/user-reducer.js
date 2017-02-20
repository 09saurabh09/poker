import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
  userToken: null,
  userData: {}
};

const userReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.AUTHENTICATE_USER_SUCCESS:
      let {token: userToken, ...userData} = action.user;
      return Object.assign({}, state, { userToken, userData });

    case types.SIGNUP_USER_SUCCESS: 
      return Object.assign({}, state, {});
      
    case types.GET_USERS_SUCCESS:
      return Object.assign({}, state, { users: action.users });

    case types.DELETE_USER_SUCCESS:

      // Use lodash to create a new user array without the user we want to remove
      const newUsers = _.filter(state.users, user => user.id != action.userId);
      return Object.assign({}, state, { users: newUsers });

    case types.USER_INFO_SUCCESS:
      return Object.assign({}, state, { userData: action.userInfo.data });

  }

  return state;

}

export default userReducer;
