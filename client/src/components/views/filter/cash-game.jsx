import React from 'react';
import './filter.scss';

import CheckboxElement from '../checkbox-element/checkbox-element';
import SwitchElement from '../switch-element/switch-element';
import RadioElement from '../radio-element/radio-element';
var PlayIcon = require('babel!svg-react!../../../../assets/img/loby/svg/yoga-play.svg?name=PlayIcon');
var LoginIcon = require('babel!svg-react!../../../../assets/img/loby/svg/login-button.svg?name=LoginIcon');

export default class CashGameFilter extends React.Component {
	constructor(props) {
			super(props);
      this.login = this.login.bind(this);
      window.onclick = (event) => {
        console.log(event);
        var modal = document.getElementById('cash-game-filter');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

	}

  login() {
    alert('login');
  }

	render() {
		return (

      <div id="cash-game-filter" className="bottom-sheet">

        <div className="bottom-sheet-content">
          <div className="bottom-sheet-header">
            <div className="uppercase">Select your filter</div>
          </div>
          <div className="bottom-sheet-body">
            <div className="row">
              <div className="col-lg-2 border-right">
                <div className="margin-b-32">
                  <div className="margin-b-16 text-uppercase">Money Type</div>
                  <div className="row">
                    <div className="col-lg-3">
                      Play
                    </div>
                    <div className="col-lg-5">
                      <SwitchElement /> 
                    </div>
                    <div className="col-lg-3 text-right">
                      Real
                    </div>
                  </div>
                </div>
                <div className="margin-b-32">
                  <div className="margin-b-16 text-uppercase">Buy In</div>
                  <div className="row">
                    <div className="col-lg-3">
                      Stakes
                    </div>
                    <div className="col-lg-5">
                      <SwitchElement /> 
                    </div>
                    <div className="col-lg-3 text-right">
                      Blinds
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 border-right">
                <div className="margin-b-32">
                  <div className="margin-b-16 text-uppercase">Game Type</div>
                  <div className="radio">
                    <div className="margin-20">
                      <RadioElement groupName="radio1" label="Hold’Em (2 cards)" inputId="holdem"/>
                    </div>
                    <div className="margin-20">
                      <RadioElement groupName="radio1" label="Omaha (4 cards)" inputId="omaha"/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 border-right">
                <div className="margin-b-32">
                  <div className="margin-b-16 text-uppercase">Access Type</div>
                  <CheckboxElement label="Open" checkboxId="open"/>
                  <CheckboxElement label="Private" checkboxId="Private"/>
                  <CheckboxElement label="Anonymous" checkboxId="Anonymous"/>
                </div>
              </div>
              <div className="col-lg-4">
                
              </div>
              <div className="col-lg-1">
                
              </div>
            </div>
          </div>
        </div>

      </div>
		)
	}
}