import React from 'react';
import { Link } from 'react-router';
import * as userApi from '../../api/user-api';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let token = localStorage.getItem('userToken');
    if(token) {
      userApi.getUserInfo(token, 'small');  
    }
  }

  render() {
    return (
      <div className="app">
        {this.props.children}
      </div> 
    )
  }
}
