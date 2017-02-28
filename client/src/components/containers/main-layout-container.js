import React from 'react';
import { Link } from 'react-router';
import * as userApi from '../../api/user-api';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    userApi.getUserInfo('large');  
  }

  render() {
    return (
      <div className="app">
        {this.props.children}
      </div> 
    )
  }
}
