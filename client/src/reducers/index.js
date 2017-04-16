import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';


//Poke Reducers
import gameTableReducer from './game-table-reducer';
import gameStateReducer from './game-state-reducer';
import userReducer from './user-reducer';
import connectSocketReducer from './connect-socket-reducer';

// Combine Reducers
var reducers = combineReducers({
	socket: connectSocketReducer,
    userState: userReducer,
    gameState: gameStateReducer,
    gameTable: gameTableReducer,
    routing : routerReducer
});

export default reducers;
