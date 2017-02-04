import React from 'react';
import './game-actions.scss';

export default class GameActions extends React.Component{

  render() {
    return (
      <div className="game-actions">
        <form action="#">
          <div className="values space-between">
            <div className="button-container">
              <a className="button" href>1/2</a>
            </div>
            <div className="button-container">
              <a className="button" href>3/4</a>
            </div>
            <div className="button-container">
              <a className="button" href>Pot</a>
            </div>
            <div className="button-container">
              <a className="button" href>Max</a>
            </div>
            <div className="button-container">
              <input type="text" id="call-value" name="call-value" />
            </div>
          </div>
          <div className="range-field">
            <input type="range" id="test5" min="0" max="100" />
          </div>
          <div className="actions space-between">
            <div className="button-container">
              <a className="button" href>Fold</a>
            </div>
            <div className="button-container">
              <a className="button" href>Call {`${9.4}k`}</a>
            </div>
            <div className="button-container">
              <a className="button" href>Raise</a>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
