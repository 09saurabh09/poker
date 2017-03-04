import React from 'react';
import { connect } from 'react-redux';
import * as userApi from '../../api/user-api';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    userApi.getUserInfo(this.props.dispatch, 'large');  
  }

  render() {
    return (
      <div className="app">
        {this.props.children}
      </div> 
    )
  }
}

const mapStateToProps = function(state) {
  return {
    userData: state.userState.userData
  };
};

export default connect(mapStateToProps)(App);