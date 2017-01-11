import React from 'react';
import './radio-element.scss';

export default class SwitchElement extends React.Component {

  render() {
    return (
      <div>
        <input className="with-gap" name={this.props.groupName} type="radio" id={this.props.inputId}  />
        <label htmlFor={this.props.inputId}>{this.props.label}</label>
      </div>
    );
  }
}
