import React from 'react';
//import './radio-element.scss';

export default class RadioElement extends React.Component {

  render() {
    let icon = <div className="radio-icon-container">
                <img className="radio-icon-wrapper icon-wrapper" src={this.props.icon} />
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
