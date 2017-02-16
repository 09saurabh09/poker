import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

// Reducers

import widgetReducer from './widget-reducer';
import searchLayoutReducer from './search-layout-reducer';

//Poke Reducers
import gameTableReducer from './game-table-reducer';
import gameStateReducer from './game-state-reducer';
import userReducer from './user-reducer';
import socketReducer from './socket-reducer';

// Combine Reducers
var reducers = combineReducers({
	socket: socketReducer,
    userState: userReducer,
    widgetState: widgetReducer,
    searchLayoutState: searchLayoutReducer,
    gameState: gameStateReducer,
    gameTable: gameTableReducer,
    routing : routerReducer
});

export default reducers;
