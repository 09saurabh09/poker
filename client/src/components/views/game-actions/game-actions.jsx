import React from 'react';
//import './game-actions.scss';

import RangeSlider from '../range-slide/range-slide.jsx';

export default class GameActions extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.range.value || this.props.range.min,
      rangeValue: this.props.range.value || this.props.range.min
    };
  }

  isNumber(str) {
    var pattern = /^[0-9.]+$/;
    return pattern.test(str);  // returns a boolean
  }

  onHotKeyPress(key) {
    let hotKeyValue;
    let value;
    hotKeyValue = parseFloat(parseFloat(this.props.userData[this.props.flopState][key]).toFixed(2));
    if(this.props.flopState == 'preFlop') {
      value = hotKeyValue * this.props.bbValue;
    } else {
       value = hotKeyValue * this.props.range.potValue / 100;
    }
    value = parseInt(value);
    this.setState({
      inputValue : value,
      rangeValue: value
    })
  }

  updateRangeValue(value) {
    if(value && this.state.inputValue == value) {
      this.setState({
        rangeValue: value
      });
    }
  }

  handleChange(event) {
    let value = event.target.value;
    if(this.isNumber(value)) {
      value = parseInt(value);
    } else {
      value = '';
    }
    this.setState({
      inputValue: value
    });
    setTimeout(this.updateRangeValue.bind(this, value), 1000);
  }

  onUpdate(val) {
    let value = parseInt(val[0]);
    if(value != this.state.rangeValue) {
      this.setState({
        inputValue : value,
        rangeValue: value
      }); 
    }
  }

  minusRaise() {
    let step = this.props.range.step;
    if(step < 1) {
      step = 1
    }
    let newValue = parseInt(parseFloat(parseFloat(this.state.inputValue).toFixed(2)) - step);
    this.setState({
      inputValue: newValue,
      rangeValue: newValue
    }); 
  }

  plusRaise() {
    let step = this.props.range.step;
    if(step < 1) {
      step = 1
    }
    let newValue = parseInt(parseFloat(parseFloat(this.state.inputValue).toFixed(2)) + step);
    this.setState({
      inputValue: newValue,
      rangeValue: newValue
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    document.getElementById('raise-button').click();
  }

  handleFocus(e) {
    this.setState({
      inputValue: ''
    });
  }

  handleOnBlur() {
    if(this.state.inputValue == '') {
      this.setState({
        inputValue: this.state.rangeValue
      });
    }
  }


  render() {
    let { userData, flopState } = this.props;
    let hotKey1 = userData && userData[flopState] && userData[flopState].hotKey1,
    hotKey2 = userData && userData[flopState] && userData[flopState].hotKey2,
    hotKey3 = userData && userData[flopState] && userData[flopState].hotKey3;
    return (
      <div className="game-actions">
        <form action="#" onSubmit={this.handleSubmit.bind(this)}>
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
              <a onClick={e => this.props.onAction(e, "allIn", this.state.inputValue)} className="button">Max</a>
            </div>
            <div className="input-container">
              <input type="text" id="call-value" name="call-value" step={this.props.range.step} 
              min={this.props.range.min} max={this.props.range.max} value={this.state.inputValue} 
              onChange={this.handleChange.bind(this)} className="form-control" onFocus={this.handleFocus.bind(this)}
              onBlur={this.handleOnBlur.bind(this)}/>
            </div>
          </div>
          <div id="slider-range" className="range-field">
            <RangeSlider
              range={{min: this.props.range.min, max: this.props.range.max}}
              start={[parseInt(this.state.rangeValue)]}
              connect={[true, false]}
              behaviour='tap'
              step={this.props.range.step}
              onUpdate={this.onUpdate.bind(this)}
            />
            <div className="minus indicator" onClick={this.minusRaise.bind(this)}>-</div>
            <div className="plus indicator" onClick={this.plusRaise.bind(this)}>+</div>
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
              <button type="button" id="raise-button" onClick={(event) => {this.props.onAction(event, "raise", this.state.inputValue)}} className="button">Raise</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
