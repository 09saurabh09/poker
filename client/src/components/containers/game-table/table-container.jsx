import React from 'react';
import { connect } from 'react-redux';
import * as gameStateApi from '../../../api/game-state-api';
import store from '../../../store';

import TopNavContainer from '../top-navigation/top-navigation';
import GameTable from '../../views/game-table/game-table';

class TableContainer extends React.Component{

  constructor(props) {
    super(props);
    /*this.runningGame = [
    {cards: [{suit: 'diams', value: 'A'},{suit: 'hearts', value: 'Q'},{suit: 'spades', value: 3},{suit: 'clubs', value: 2}], active:true},
    {cards: [{suit: 'diams', value: 'A'},{suit: 'clubs', value: 'J'},{suit: 'hearts', value: 10},{suit: 'clubs', value: 2}], active:false}];*/
  }

  componentDidMount() {
    let tableId = this.props.params.id;
    gameStateApi.getGameState(tableId);
  }

  render(props) {
    return (
      <div className="table-container">
        <TopNavContainer runningGames={this.props.runningGame}/>
        <GameTable gameData={this.props.gameData}/>
      </div>
    );
  }
}

export default connect(
  (state)=>{
    runningGames : state.table.runningGames
    gameData: state.table.gameData
  }
)(TableContainer);



