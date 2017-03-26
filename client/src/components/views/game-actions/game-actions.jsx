import React from 'react';
//import './game-actions.scss';

import RangeSlider from '../range-slide/range-slide.jsx';

export default class GameActions extends React.Component{
  constructor(props) {
    super(props);
    this.state = {value: this.props.range.value || 0};
  }

  onHotKeyPress(key) {
    let hotKeyValue;
    let value;
    hotKeyValue = this.props.userData[this.props.flopState][key];
    if(this.props.flopState == 'preFlop') {
      value = hotKeyValue * this.props.bbValue;
    } else {
       value = hotKeyValue * this.props.range.potValue / 100;
    }
    this.setState({
      value
    })
  }

  handleChange(event) {
    this.setState({value: parseFloat(event.target.value).toFixed(2)});
  }

  onUpdate(val) {
    let value = val[0];
    if(value != this.state.value) {
      this.setState({value}); 
    }
  }

  render() {
    let { userData, flopState } = this.props;
    let hotKey1 = userData && userData[flopState] && userData[flopState].hotKey1,
    hotKey2 = userData && userData[flopState] && userData[flopState].hotKey2,
    hotKey3 = userData && userData[flopState] && userData[flopState].hotKey3;
    return (
      <div className="game-actions">
        <form action="#">
          <div className="values space-between">
            <div className="button-container">
              <a onClick={this.onHotKeyPress.bind(this, 'hotKey1')} className="button">{hotKey1}{flopState=='preFlop' && 'x' || '%'}</a>
            </div>
            <div className="button-container">
              <a onClick={this.onHotKeyPress.bind(this, 'hotKey2')} className="button">{hotKey2}{flopState=='preFlop' && 'x' || '%'}</a>
            </div>
            <div className="button-container">
              <a onClick={this.onHotKeyPress.bind(this, 'hotKey3')} className="button">{hotKey3}{flopState=='preFlop' && 'x' || '%'}</a>
            </div>
            <div className="button-container">
              <a onClick={e => this.props.onAction(e, "allIn", this.state.value)} className="button">Max</a>
            </div>
            <div className="input-container">
              <input type="text" id="call-value" name="call-value" step={this.props.range.step} 
              min={this.props.range.min} max={this.props.range.max} value={this.state.value} 
              onChange={this.handleChange.bind(this)} className="form-control"/>
            </div>
          </div>
          {/*<RangeSlide range={this.props.range} value={this.state.value} handleChange={this.handleChange.bind(this)} onUpdate={this.onUpdate.bind(this)} />*/}
          <div id="slider-range" className="range-field">
            <RangeSlider
              range={{min: this.props.range.min, max: this.props.range.max}}
              start={[parseFloat(this.state.value).toFixed(2)]}
              connect={[true, false]}
              behaviour='tap'
              step={this.props.range.step}
              onUpdate={this.onUpdate.bind(this)}
            />
            <div className="minus indicator">-</div>
            <div className="plus indicator">+</div>
          </div>
          <div className="actions space-between">
            <div className="button-container">
              <button type="button" onClick={(event) => {this.props.onAction(event, "fold", 0)}} className="button">Fold</button>
            </div>
            <div className="button-container">
              <button type="button" onClick={(event) => {this.props.onAction(event, "callOrCheck", this.props.callValue)}} className="button">
                <span>{this.props.callValue != 0 ? `Call ${this.props.callValue}`: 'Check'}</span>
              </button>
            </div>
            <div className="button-container">
              <button type="button" onClick={(event) => {this.props.onAction(event, "raise", this.state.value)}} className="button">Raise</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
