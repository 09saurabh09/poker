import axios from 'axios';
import store from '../store';
import { getGameStateSuccess } from '../actions/game-state-actions';

/**
 * Get Game State
 */

export function getGameState(tableId) {
	let newState = {
  runningGames: [{cards: [{suit: 'diams', value: 'A'},{suit: 'hearts', value: 'Q'},{suit: 'spades', value: 3},{suit: 'clubs', value: 2}], active:true},
    {cards: [{suit: 'diams', value: 'A'},{suit: 'clubs', value: 'J'},{suit: 'hearts', value: 10},{suit: 'clubs', value: 2}], active:false}],
  gameData: {}
}
  /*return axios.get('http://localhost:3001/tableId')
    .then(response => {
      store.dispatch(getGameStateSuccess(response.data));
      return response;
    });*/
    store.dispatch(getGameStateSuccess(newState));
    /*return {data: [{cards: [{suit: 'diams', value: 'A'},{suit: 'hearts', value: 'Q'},{suit: 'spades', value: 3},{suit: 'clubs', value: 2}], active:true},
    {cards: [{suit: 'diams', value: 'A'},{suit: 'clubs', value: 'J'},{suit: 'hearts', value: 10},{suit: 'clubs', value: 2}], active:false}]}*/
}

