import React from 'react';

import './game-table.scss';

import Player from '../player/player';

export default class GameTable extends React.Component{

  constructor(props) {
    super(props);
    $(document).ready(function() {
        $(window).resize(function() {
          if($('.main-table').height() <= ($(window).height() * .65) ){
            $('.main-table').width( $(window).width() * .75 );
            $('.main-table').height( $(window).width() * .40 );
          } else {
            $('.main-table').height( $(window).height() * .70);
            $('.main-table').width( $('.main-table').height() * 2 );
          }
        }).resize();
    });
  }

  render() {
    let allPlayers = Array.apply(null, Array(9));
    return (
      <div className="game-table">
        <div className="main-table">
           {allPlayers.map((element, index)=> 
            <div key={index} className={'game-player ' + 'player' + index}>
              <Player />
            </div>
            )}
        </div>
      </div>
    );
  }
}
