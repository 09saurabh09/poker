import React from 'react';
import { connect } from 'react-redux';
import * as userApi from '../../api/user-api';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(userApi.getUserInfo('small'));
    $('document').ready(()=>{
      $('#dp-container').height($('#dp-container').width());  
    });
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