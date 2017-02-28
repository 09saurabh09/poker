import React from 'react';
import './checkbox-element.scss';

export default class CheckboxElement extends React.Component{
  constructor(props) {
    super(props);
  }

  /*handleOnChange(event) {
    debugger;
    this.setState({
      checked: event.target.checked
    })
    this.props.onChangeCheckbox(event.target.checked);
  }*/



  render() {
    return (
      <div className="">
        <input type="checkbox" className="filled-in" checked={this.props.checked} id={this.props.checkboxId} onChange={this.props.onChangeCheckbox && this.props.onChangeCheckbox.bind(null)}/>
        <label htmlFor={this.props.checkboxId} className="round-checkbox">{this.props.label}</label>
      </div>
    );
  }
}
