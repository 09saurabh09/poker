import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

// Reducers
import userReducer from './user-reducer';
import widgetReducer from './widget-reducer';
import searchLayoutReducer from './search-layout-reducer';

//Poke Reducers
import gameStateReducer from './game-state-reducer';


// Combine Reducers
var reducers = combineReducers({
    userState: userReducer,
    widgetState: widgetReducer,
    searchLayoutState: searchLayoutReducer,
    gameState: gameStateReducer,
    routing : routerReducer
});

export default reducers;
