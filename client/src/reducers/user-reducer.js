import * as types from '../actions/action-types';

const initialState = {
  userToken: null,
  userData: {},
  userCards: {},
  myTables: []
};

const userReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.AUTHENTICATE_USER_SUCCESS:
      let {token: userToken, userData} = action.user;
      return Object.assign({}, state, { userToken, userData });

    case types.SIGNUP_USER_SUCCESS: 
      return Object.assign({}, state, {});
      
    case types.LIST_MYTABLES_SUCCESS:
      let userCards = {};
      let myTables = action.myTables;
      myTables.forEach((table)=>{
        let tableId = table.id;
        userCards[tableId] = table.userCards;
      })
      return Object.assign({}, state, { myTables, userCards });

    case types.UPDATE_USER_CARDS:

      return Object.assign({}, state, { userCards: {
        [action.data.tableId] : action.data.cards
      } });

    case types.USER_INFO_SUCCESS:
      return Object.assign({}, state, { userData: action.userInfo.data });

  }

  return state;

}

export default userReducer;
