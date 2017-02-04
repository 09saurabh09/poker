import React from 'react';
import './game-actions.scss';

export default class GameActions extends React.Component{

  render() {
    return (
      <div className="game-actions">
        <form action="#">
          <p class="range-field">
            <input type="range" id="test5" min="0" max="100" />
          </p>
        </form>
      </div>
    );
  }
}
