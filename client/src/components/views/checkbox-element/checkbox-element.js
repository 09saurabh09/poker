import React from 'react';
import './checkbox-element.scss';

export default class CheckboxElement extends React.Component{

  render() {
    return (
      <div className="">
        <input type="checkbox" className="filled-in" checked={this.props.checked} id={this.props.checkboxId}/>
        <label htmlFor={this.props.checkboxId} className="round-checkbox">{this.props.label}</label>
      </div>
    );
  }
}