import React from 'react';
//import './buyin-pref.scss';

import RangeSlider from '../range-slide/range-slide.jsx';
import CheckboxElement from '../checkbox-element/checkbox-element';
import TournamentLogo from '../../../../assets/img/game/tournament-logo.svg';

export default class BuyinPref extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.bbValue.value,
      inputValue: this.props.bbValue.value * this.props.bigBlind,
      maintainStack: true,
      autoPost: true
    };
  }

  componentDidMount() {
    $(document).ready(()=>{
      var modal = document.getElementById('buyin-pref');

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
          if (event.target == modal) {
              modal.style.display = 'none';
          }
      }
    })
  }

  handleBlur(event) {
    this.setState({value: event.target.value/this.props.bigBlind});
  }

  handleChange(event) {
    this.setState({inputValue: event.target.value, value: event.target.value/this.props.bigBlind});
  }

  onChange(val) {
    let value = val[0];
    if(value != this.state.value) {
      this.setState({value, inputValue: value*this.props.bigBlind}); 
    }
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
    return (
      <div className="modal fade-scale" id="buyin-pref" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="vertical-alignment-helper">
          <div className="modal-dialog vertical-align-center">
            <div id="buyin-pref-content" className="modal-content">
              <div className="modal-body">
                <div className="modal-container">
                  <div className="tournament-logo-icon-container">
                    <div className="tournament-logo-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${TournamentLogo})`}}></div>
                  </div>
                  <form className="form-horizontal">
                    <div className="form-container">
                      <div className="pref-input-container margin-b-48">
                        <div className="label-wrapper">
                          <div className="pref-label">Big Blind Preference</div>
                        </div>
                        <div className="text-right">
                          <input type="number" id="pref" name="pref" className="pref-input" 
                          min={this.props.bbValue.min*this.props.bigBlind} 
                          max={this.props.bbValue.max*this.props.bigBlind} 
                          onChange={this.handleChange.bind(this)} 
                          onBlur={this.handleBlur.bind(this)} 
                          value={this.state.inputValue} /> 
                          <p id="error-message" >{errorMessage}</p>
                        </div>
                      </div>
                      <div className="range-buyin-pref  margin-b-48">
                        <RangeSlider 
                          range={{min: this.props.bbValue.min, max: this.props.bbValue.max}}
                          start={[parseFloat(this.state.value)]}
                          connect={[true, false]}
                          behaviour='tap'
                          step={this.props.bbValue.step}
                          tooltips={wNumb({ decimals: 0 })}
                          onChange={this.onChange.bind(this)}

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
                      </div>
                      <div className="button-container">
                        <button type="button" className="button text-uppercase" 
                        onClick={this.props.onSet.bind(null, this.state.inputValue, this.state.maintainStack, this.state.autoPost)}> Set </button>
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