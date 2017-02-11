import React from 'react';
import './radio-element.scss';

export default class SwitchElement extends React.Component {

  render() {
    let icon = <div className="radio-icon-container">
                <div className="radio-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${this.props.icon})`}}></div>
              </div>;
    return (
      <div className="radio-container">
        <input className="with-gap" name={this.props.groupName} type="radio" id={this.props.inputId}  />
        <label htmlFor={this.props.inputId}>
          {!!this.props.icon ? icon : null}
        {this.props.label}</label>
      </div>
    );
  }
}
