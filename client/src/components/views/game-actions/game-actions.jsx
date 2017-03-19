import React from 'react';
//import './game-actions.scss';

import RangeSlider from '../range-slide/range-slide.jsx';

export default class GameActions extends React.Component{
  constructor(props) {
    super(props);
    this.state = {value: this.props.range.value || 0};
  }
  onHalfClick() {
    this.setState({
      value: (this.props.range.max - this.props.range.min )/2
    })
  }

  onThreeForthClick() {
    this.setState({
      value: (this.props.range.max - this.props.range.min ) * 0.75
    })
  }

  onPotClick() {
    this.setState({
      value: this.props.range.potValue
    })
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  onUpdate(val) {
    let value = val[0];
    if(value != this.state.value) {
      this.setState({value}); 
    }
  }

  render() {
    return (
      <div className="game-actions">
        <form action="#">
          <div className="values space-between">
            <div className="button-container">
              <a onClick={this.onHalfClick.bind(this)} className="button">1/2</a>
            </div>
            <div className="button-container">
              <a onClick={this.onThreeForthClick.bind(this)} className="button">3/4</a>
            </div>
            <div className="button-container">
              <a onClick={this.onPotClick.bind(this)} className="button">Pot</a>
            </div>
            <div className="button-container">
              <a onClick={this.props.onAction.bind(null, "allIn", this.state.value)} className="button">Max</a>
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
              start={[parseFloat(this.state.value)]}
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
                <span>{this.props.callValue ? `Call ${this.props.callValue}`: 'Check'}</span>
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
