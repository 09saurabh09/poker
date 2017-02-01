import React from 'react';
import { Link } from 'react-router';

import GameTable from '../../views/game-table/game-table'

export default class TableContainer extends React.Component{

  constructor(props) {
    super(props);
  }

  render(props) {
    return (
      <div>
        <GameTable />
      </div>
    );
  }
}
