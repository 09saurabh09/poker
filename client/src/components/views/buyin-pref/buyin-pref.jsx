import React from 'react';
//import './buyin-pref.scss';

import RangeSlider from '../range-slide/range-slide.jsx';
import CheckboxElement from '../checkbox-element/checkbox-element';
const TournamentLogo = '../../../../assets/img/game/tournament-logo.svg';

import wNumb from 'wnumb';

export default class BuyinPref extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.bbValue.value,
      inputValue: this.props.bbValue.value * this.props.bigBlind,
      straddle: true,
      maintainStack: true,
      autoPost: true
    };
  }

  componentDidMount() {
    $(document).ready(()=>{
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target.classList.contains("modal")) {
          $('.modal').hide();
        }
      }
    })
  }

  handleChange(event) {
    let {value} = event.target;
    let inputValue = value ? parseInt(value) : 0;
    this.setState({inputValue});
  }

  onChange(val) {
    let value = val[0];
    if(value != this.state.value) {
      this.setState({value, inputValue: value*this.props.bigBlind}); 
    }
  }

  handleStraddleChange(event) {
    this.setState({
      straddle: event.target.checked
    })
  }

  handleMaintainStackChange(event) {
    this.setState({
      maintainStack: event.target.checked
    })
  }

  handleAutoPostChange(event) {
    this.setState({
      autoPost: event.target.checked
    })
  }

  render() {
    let errorMessage;
    let { inputValue } = this.state;
    inputValue = parseInt(inputValue);
    if(inputValue < this.props.bbValue.min * this.props.bigBlind) {
      errorMessage = 'Less than Minimum';
    }
    if(inputValue > this.props.bbValue.max * this.props.bigBlind) {
      errorMessage = 'More than Maximum';
    }
    let bankroll = parseInt(this.props.bankroll);
    let insufficient = false;
    if(bankroll < inputValue) {
      insufficient = true;
      errorMessage = 'Bankroll Insufficient';
    }
    bankroll = bankroll > 1000 ? `${parseInt(bankroll) / 1000}K`: bankroll;
    /*let displayInputValue = inputValue;
    displayInputValue = displayInputValue > 1000 ? `${parseInt(displayInputValue) / 1000}K`: displayInputValue;*/
    return (
      <div className="modal fade-scale" id="buyin-pref" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="vertical-alignment-helper">
          <div className="modal-dialog vertical-align-center">
            <div id="buyin-pref-content" className="modal-content">
              <div className="modal-body">
                <div className="modal-container">
                  <div className="settings-icon-container">
                    <img className="tournament-logo-icon-wrapper icon-wrapper" src={TournamentLogo} />
                  </div>
                  <form className="form-horizontal">
                    <div className="form-container">
                      <div className="pref-input-container">
                        <div className="label-wrapper col-lg-6">
                          <label className="pref-label">Big Blind Preference</label>
                        </div>
                        <div className="text-left col-lg-6">
                          <input type="text" id="pref" name="pref" className="pref-input form-control" 
                          min={this.props.bbValue.min*this.props.bigBlind} 
                          max={this.props.bbValue.max*this.props.bigBlind} 
                          onChange={this.handleChange.bind(this)}
                          value={inputValue} />
                          <span className="display-bb">{inputValue / this.props.bigBlind}BB</span>
                        </div>
                      </div>
                      <div className="pref-input-container">
                        <div className="label-wrapper col-lg-6">
                          <label className="pref-label">Average Stack</label>
                        </div>
                        <div className="text-left">
                          <span className="display-bb">{this.props.avgStack}BB</span>
                        </div>
                      </div>
                      <div className="pref-input-container">
                        <div className="label-wrapper col-lg-6">
                          <label className="pref-label">Bankroll</label>
                        </div>
                        <div className="text-right">
                          <span className="display-bankroll">{bankroll}</span>
                        </div>
                      </div>
                      {errorMessage ? <p id="error-message" >{errorMessage}</p> : null }
                      <div className="range-buyin-pref">
                        <RangeSlider 
                          range={{min: this.props.bbValue.min, max: this.props.bbValue.max}}
                          start={[parseFloat(this.state.value)]}
                          connect={[true, false]}
                          behaviour='tap'
                          step={this.props.bbValue.step}
                          tooltips={wNumb({ decimals: 0 })}
                          onChange={this.onChange.bind(this)}
                          />
                          <div className="bb-value min">{this.props.bbValue.min}BB</div>
                          <div className="bb-value max">{this.props.bbValue.max}BB</div>
                      </div>
                      
                      <div className="user-settings">
                        <div className="straddle">
                          <CheckboxElement 
                            onChangeCheckbox={this.handleStraddleChange.bind(this)}
                            checked={this.state.straddle}
                            label="Straddle"
                            checkboxId="straddle"
                          />
                        </div>
                        <div className="maintain-stack">
                          <CheckboxElement 
                            onChangeCheckbox={this.handleMaintainStackChange.bind(this)}
                            checked={this.state.maintainStack}
                            label="Maintain Stack"
                            checkboxId="maintain-stack"
                          />
                        </div>
                        <div className="auto-post">
                          <CheckboxElement 
                            onChangeCheckbox={this.handleAutoPostChange.bind(this)}
                            checked={this.state.autoPost}
                            label="Auto Post"
                            checkboxId="auto-post"
                          />
                        </div>
                      </div>
                      <div className="set-button-container">
                        <button type="button" className="button text-uppercase" 
                        onClick={this.props.onSet.bind(null, inputValue, this.state.maintainStack, this.state.autoPost)}> {insufficient ?'Deposit' :'Set'} </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    )
  }
}