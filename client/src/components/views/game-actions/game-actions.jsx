import React from 'react';
import './game-actions.scss';

export default class GameActions extends React.Component{
  constructor(props) {
    super(props);
    this.state = {value: this.props.range.value};
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

  onMaxClick() {
    this.setState({
      value: this.props.range.max
    })
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  onFoldClick(event) {
    
  }

  onCallClick(event) {
    
  }

  onRaiseClick(event) {
    
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
              <a onClick={this.onMaxClick.bind(this)} className="button">Max</a>
            </div>
            <div className="button-container">
              <input type="number" id="call-value" name="call-value" step={this.props.range.step} min={this.props.range.min} max={this.props.range.max} value={this.state.value} onChange={this.handleChange.bind(this)}/>
            </div>
          </div>
          <div className="range-field">
            <input type="range" id="range-slider" step={this.props.range.step} min={this.props.range.min} max={this.props.range.max} value={this.state.value} onChange={this.handleChange.bind(this)}/>
          </div>
          <div className="actions space-between">
            <div className="button-container">
              <a onClick={this.onFoldClick.bind(this)} className="button">Fold</a>
            </div>
            <div className="button-container">
              <a onClick={this.onCallClick.bind(this)} className="button">Call {`${this.state.value}`}</a>
            </div>
            <div className="button-container">
              <a onClick={this.onRaiseClick.bind(this)} className="button">Raise</a>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
