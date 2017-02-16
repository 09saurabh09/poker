import React from 'react';
import './buyin-pref.scss';

import RangeSlider from '../range-slide/range-slide';
import CheckboxElement from '../checkbox-element/checkbox-element';
import TournamentLogo from '../../../../assets/img/game/tournament-logo.svg';

export default class BuyinPref extends React.Component {
  constructor(props) {
    super(props);
    $(document).ready(()=>{
      var modal = document.getElementById('buyin-pref');

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
          if (event.target == modal) {
              modal.style.display = 'none';
          }
      }
    })
    this.state = {
      value: this.props.bbValue.value,
      maintainStack: true,
      autoPost: true
    };
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
                          <input type="text" id="pref" name="pref" className="pref-input" onChange={this.handleChange.bind(this)} value={parseInt(this.state.value)} /> 
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
                          onUpdate={this.onUpdate.bind(this)}
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
                        onClick={this.props.onSet.bind(null, this.state.value, this.state.maintainStack, this.state.autoPost)}> Set </button>
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