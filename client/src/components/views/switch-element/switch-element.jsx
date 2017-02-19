import React from 'react';
if(process.env.WEBPACK) {
	require( './switch-element.scss' );
}

export default class SwitchElement extends React.Component{

  render() {
    return (
      <label className="switch">
        <input type="checkbox" checked={this.props.checked} />
        <div className="slider round"></div>
      </label>
    );
  }
}
