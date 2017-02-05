import React from 'react';
import './range-slide.scss';

import noUiSlider from '../../../plugins/nouislider.js';
import '../../../plugins/nouislider.min.css';

export default class RangeSlide extends React.Component{

  constructor(props) {
    super(props);
    this.state = {value: this.props.value};
    $(document).ready(()=>{

      var rangeSlider = document.getElementById('slider-range');

      noUiSlider.create(rangeSlider, {
        start: [ this.props.range.value],
        connect: [true, false],
        behaviour: 'tap',
        step: this.props.range.step,
        range: {
          'min': [  this.props.range.min ],
          'max': [ this.props.range.max ]
        }
      });
      rangeSlider.noUiSlider.on('update', this.props.onUpdate.bind(this));
    })
  }

  componentWillReceiveProps(nextProps, nextState) {
    debugger;
    if(nextProps.value != this.props.value) {
      var rangeSlider = document.getElementById('slider-range');
      rangeSlider.noUiSlider.off('update');
      rangeSlider.noUiSlider.set(nextProps.value);
      setTimeout(()=>{
        rangeSlider.noUiSlider.on('update', this.props.onUpdate.bind(this));  
      }, 1000)
      
    }
  }

  render() {
    debugger;
    return (
      <div className="range-field">
        {/*<input type="range" id="slider-range" step={this.props.range.step} min={this.props.range.min} 
          max={this.props.range.max} value={this.props.value} onChange={this.props.handleChange.bind(this)}/>*/}
          <div className="range-slider" id="slider-range"></div>
      </div>
    );
  }
}
