import React from 'react';
//import './buyin-pref.scss';

import RangeSlider from '../range-slide/range-slide.jsx';
import CheckboxElement from '../checkbox-element/checkbox-element';
import TournamentLogo from '../../../../assets/img/game/tournament-logo.svg';

import Svg from '../svg/svg.jsx';

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
    this.setState({inputValue: event.target.value});
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
    if(this.state.inputValue < this.props.bbValue.min * this.props.bigBlind) {
      errorMessage = 'Has to be more than minimum amount';
    }
    if(this.state.inputValue > this.props.bbValue.max * this.props.bigBlind) {
      errorMessage = 'Has to be less than maximum amount';
    }
    let bankroll = this.props.bankroll;
    bankroll = bankroll > 1000 ? `${parseInt(bankroll) / 1000}K`: bankroll;
    /*let displayInputValue = this.state.inputValue;
    displayInputValue = displayInputValue > 1000 ? `${parseInt(displayInputValue) / 1000}K`: displayInputValue;*/
    return (
      <div className="modal fade-scale" id="buyin-pref" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="vertical-alignment-helper">
          <div className="modal-dialog vertical-align-center">
            <div id="buyin-pref-content" className="modal-content">
              <div className="modal-body">
                <div className="modal-container">
                  <div className="settings-icon-container">
                    <Svg className="tournament-logo-icon-wrapper icon-wrapper" markup={TournamentLogo} />
                  </div>
                  <form className="form-horizontal">
                    <div className="form-container">
                      <div className="pref-input-container">
                        <div className="label-wrapper col-lg-6">
                          <label className="pref-label">Big Blind Preference</label>
                        </div>
                        <div className="text-left col-lg-6">
                          <input type="number" id="pref" name="pref" className="pref-input form-control" 
                          min={this.props.bbValue.min*this.props.bigBlind} 
                          max={this.props.bbValue.max*this.props.bigBlind} 
                          onChange={this.handleChange.bind(this)}
                          value={this.state.inputValue} />
                          <span className="display-bb">{this.state.inputValue / this.props.bigBlind}BB</span>
                          {errorMessage ? <p id="error-message" >{errorMessage}</p> : null }
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
                        <div className="text-left">
                          <span className="display-bankroll">{bankroll}</span>
                        </div>
                      </div>
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
                          <CheckboxElement 
                            onChangeCheckbox={this.handleStraddleChange.bind(this)}
                            checked={this.state.straddle}
                            label="Straddle"
                            checkboxId="straddle"
                          />
                      </div>
                      <div className="user-settings">
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
                        <div className="set-button-container">
                          <button type="button" className="button text-uppercase" 
                          onClick={this.props.onSet.bind(null, this.state.inputValue, this.state.maintainStack, this.state.autoPost)}> Set </button>
                        </div>
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