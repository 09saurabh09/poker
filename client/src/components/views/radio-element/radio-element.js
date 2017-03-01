import React from 'react';
//import './radio-element.scss';
import Svg from '../svg/svg.jsx';

export default class SwitchElement extends React.Component {

  render() {
    let icon = <div className="radio-icon-container">
                <Svg className="radio-icon-wrapper icon-wrapper" markup={this.props.icon} />
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
