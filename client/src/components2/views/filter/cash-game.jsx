import React from 'react';


if(process.env.WEBPACK) {
  require( './filter.scss' );
  var HoldemIcon = require( '../../../../assets/img/table/svg/2-cards.svg' );
  var OmahaIcon = require( '../../../../assets/img/table/svg/4-cards.svg' );
  var wNumb = require( '../../../plugins/wNumb.js' );
}

import RangeSlider from '../range-slide/range-slide.jsx';
import CheckboxElement from '../checkbox-element/checkbox-element.jsx';
import SwitchElement from '../switch-element/switch-element.jsx';
import RadioElement from '../radio-element/radio-element.jsx';

export default class CashGameFilter extends React.Component {
	constructor(props) {
			super(props);
      this.login = this.login.bind(this);
	}

  login() {
    alert('login');
  }

  componentDidMount() {
    window.onclick = (event) => {
      var modal = document.getElementById('cash-game-filter');
      if (event.target == modal) {
          modal.style.display = 'none';
      }
    }
  }

	render() {
		return (

      <div id="cash-game-filter" className="bottom-sheet">

        <div className="bottom-sheet-content">
          <div className="bottom-sheet-header margin-b-16">
            <div className="uppercase select-filter">Select your filter</div>
            <div className="already-open-container">
              <CheckboxElement label="Already On" checkboxId="already-open"/>
            </div>
            <div className="join-now">
              <CheckboxElement label="Join Now" checkboxId="join-now"/>
            </div>
          </div>
          <div className="bottom-sheet-body">
            <div className="row">
              <div className="col-lg-2 border-right">
                <div className="">
                  <div className="margin-b-16 text-uppercase">Money Type</div>
                  <div className="row margin-b-32">
                    <div className="col-lg-4">
                      Play
                    </div>
                    <div className="col-lg-4">
                      <SwitchElement /> 
                    </div>
                    <div className="col-lg-3 text-right">
                      Real
                    </div>
                  </div>
                </div>
                <div className="row margin-b-32">
                  <div className="col-lg-11">
                    <div className="margin-b-16 text-uppercase">Buy In ( Blinds )</div>
                      <RangeSlider 
                      range={{min: 0, max: 200}}
                      start={[50, 100]}
                      connect={true}
                      />
                  </div>
                </div>
              </div>
              <div className="col-lg-2">
                <div className="margin-b-32 game-type">
                  <div className="margin-b-16 text-uppercase">Game Type</div>
                  <div className="radio">
                    <div className="margin-20">
                      <RadioElement groupName="radio1" icon={HoldemIcon} label="Hold’Em" inputId="holdem"/>
                    </div>
                    <div className="margin-20">
                      <RadioElement groupName="radio1" icon={OmahaIcon} label="Omaha" inputId="omaha"/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 border-right border-left">
                <div className="margin-b-32 access-type">
                  <div className="margin-b-16 text-uppercase">Access Type</div>
                  <div className="margin-20">
                    <CheckboxElement label="Open" checkboxId="open"/>
                  </div>
                  <div className="margin-20">
                    <CheckboxElement label="Private" checkboxId="Private"/>
                  </div>
                  <div className="margin-20">
                    <CheckboxElement label="Anonymous" checkboxId="Anonymous"/>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 border-right">
                <div className="margin-b-32 run-type">
                  <div className="margin-b-16 text-uppercase">Run Type</div>
                  <div className="radio margin-20">
                    <RadioElement groupName="radio-run" label="Once" inputId="once-run"/>
                    <RadioElement groupName="radio-run" label="Thrice" inputId="thrice-run"/>
                  </div>
                  <div className="margin-20">
                    <div className="margin-b-32 text-uppercase">number of players</div>
                      <RangeSlider 
                      range={{min: 0, max: 9}}
                      start={[6]}
                      step={1}
                      connect={[true, false]}
                      />
                  </div>
                </div>
              </div>
              <div className="col-lg-2 ">
                <div className="result-container">
                  <div className="text-uppercase result-text">Result</div>
                  <div className="result-value">13</div>
                  <div className="button-container">
                    <button className="button text-uppercase" href> Apply </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
		)
	}
}