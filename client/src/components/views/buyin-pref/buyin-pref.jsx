import React from 'react';
//import './buyin-pref.scss';

import RangeSlider from '../range-slide/range-slide.jsx';
import CheckboxElement from '../checkbox-element/checkbox-element';
const TournamentLogo = '../../../../assets/img/game/tournament-logo.svg';
import utils from '../../../utils/utils';
import wNumb from 'wnumb';

export default class BuyinPref extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.bbValue.value,
      inputValue: this.props.bbValue.value * this.props.bigBlind || '',
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
      /*$('.noUi-tooltip').append(`<div className="pop-icon-container">
                                  <img className="pop-icon-wrapper icon-wrapper" src="../../../../assets/img/game/pop.svg" />
                                </div>`);*/
    })
  }

  handleChange(event) {
    let value = event.target.value;
    if(utils.isNumber(value)) {
      value = parseInt(value);
    } else {
      value = '';
    }
    this.setState({
      inputValue: value
    });
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

  handleSubmit(e) {
    e.preventDefault();
    document.getElementById('set-buy-in').click();
  }

  handleFocus(e) {
    this.setState({
      inputValue: ''
    });
  }

  handleOnBlur() {
    if(this.state.inputValue == '') {
      this.setState({
        inputValue: this.state.value*this.props.bigBlind
      });
    }
  }

  render() {
    let errorMessage;
    let { inputValue } = this.state;
    let inInputValue = parseInt(inputValue);
    if(inInputValue < this.props.bbValue.min * this.props.bigBlind) {
      errorMessage = 'Less than Minimum';
    }
    if(inInputValue > this.props.bbValue.max * this.props.bigBlind) {
      errorMessage = 'More than Maximum';
    }
    let bankroll = parseInt(this.props.bankroll);
    let insufficient = false;
    if(bankroll < inInputValue) {
      insufficient = true;
      errorMessage = 'Bankroll Insufficient';
    }
    bankroll = bankroll > 1000 ? `${parseInt(bankroll) / 1000}K`: bankroll;
    /*let displayInputValue = inputValue;
    displayInputValue = displayInputValue > 1000 ? `${parseInt(displayInputValue) / 1000}K`: displayInputValue;*/
    return (
      <div className="modal fade-scale" id="buyin-pref" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div id="buyin-pref-content" className="modal-content">
            <div className="modal-body">
              <div className="modal-container">
                <div className="settings-icon-container">
                  <img className="tournament-logo-icon-wrapper icon-wrapper" src={TournamentLogo} />
                </div>
                <div className="game-desc">{`${parseFloat((this.props.bigBlind/2).toFixed(2))}/${this.props.bigBlind} Hold'em`}</div>
                <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                  <div className="col-lg-12 pref-input-container">
                    <div className="col-lg-6">
                      <label className="pref-label">Big Blind Preference</label>
                    </div>
                    <div className="text-left col-lg-6">
                      <input type="text" id="pref" name="pref" className="pref-input form-control" 
                      min={this.props.bbValue.min*this.props.bigBlind} 
                      max={this.props.bbValue.max*this.props.bigBlind} 
                      onChange={this.handleChange.bind(this)}
                      value={inputValue} onFocus={this.handleFocus.bind(this)}
                      onBlur={this.handleOnBlur.bind(this)}/>
                      <span className="display-bb">{inputValue / this.props.bigBlind}BB</span>
                    </div>
                  </div>
                  <div className="col-lg-12 average-stack-container">
                    <div className="col-lg-6">
                      <label className="pref-label">Average Stack</label>
                    </div>
                    <div className="text-left col-lg-6">
                      <span className="display-bb">{this.props.avgStack}BB</span>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="col-lg-6">
                      <label className="pref-label">Bankroll</label>
                    </div>
                    <div className="text-right col-lg-6">
                      <span className="display-bb">{bankroll}</span>
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
                      <div className="range-endpoints"></div>
                      <div className="range-endpoints end"></div>
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
                    <button type="button" className="button text-uppercase active" id="set-buy-in"
                    onClick={this.props.onSet.bind(null, inputValue, this.state.straddle, this.state.maintainStack, this.state.autoPost)}> {insufficient ?'Deposit' :'Set'} </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}