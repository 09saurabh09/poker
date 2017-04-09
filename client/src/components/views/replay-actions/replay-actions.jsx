import React from 'react';
//import './replay-actions.scss';
import utils from '../../../utils/utils';

export default class ReplayActions extends React.Component{
  constructor(props) {
    super(props);
  }

  handleSubmit() {

  }

  render() {
    let playAction = this.props.playState? 'pause' : 'play';
    return (
      <div className="replay-actions">
        <form action="#">
          <div className="replay-action-buttons-container">
            <div className="button-container">
              <button type="button" className="button" onClick={this.props.replayAction.bind(null, 'handRestart')}>Hand restart</button>
            </div>
            <div className="button-container">
              <button type="button" className="button" onClick={this.props.replayAction.bind(null, 'previousHand')}>Previous Hand</button>
            </div>
            <div className="button-container">
              <button type="button" className="button" onClick={this.props.replayAction.bind(null, 'previous')}>Previous</button>
            </div>
            <div className="button-container">
              <button type="button" className="button" 
                onClick={this.props.replayAction.bind(null, playAction)}>
                {playAction}
              </button>
            </div>
            <div className="button-container">
              <button type="button" className="button" onClick={this.props.replayAction.bind(null, 'next')}>Next</button>
            </div>
            <div className="button-container">
              <button type="button" className="button" onClick={this.props.replayAction.bind(null, 'nextHand')}>Next Hand</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
