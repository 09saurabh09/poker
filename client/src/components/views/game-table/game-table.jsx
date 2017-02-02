import React from 'react';

import './game-table.scss';

import Player from '../player/player';

export default class GameTable extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Player />
      </div>
    );
  }
}
