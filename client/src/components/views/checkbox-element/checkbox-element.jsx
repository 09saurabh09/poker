import React from 'react';
if(process.env.WEBPACK) {
	require( './checkbox-element.scss' );
}


export default class CheckboxElement extends React.Component{

  render() {
    return (
      <div className="">
        <input type="checkbox" className="filled-in" checked={this.props.checked} id={this.props.checkboxId} onChange={this.props.onChangeCheckbox}/>
        <label htmlFor={this.props.checkboxId} className="round-checkbox">{this.props.label}</label>
      </div>
    );
  }
}
